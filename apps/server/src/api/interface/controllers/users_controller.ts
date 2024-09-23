import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse, ErrorEmptyResponse } from "../../config/helpers/apiResponse";
import {userSignup} from "../../config/schema/userSignup.schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../../infrastructure/env";
import {sendPassResetEmail, sendSignupEmail} from "../../lib/mailer";
import { addProducts } from "../../config/schema/adminAddProduct.schema";
import { cart } from "../../config/schema/cart.schema";
import moment from "moment";


export const UserOtpGenerate = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const existingUser = await userSignup.findOne({ email });
    if (existingUser) {
      return ErrorResponse(res, 'Email is already registered.');
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
   
    await sendSignupEmail({ email, OTP: otp }),
    await userSignup.updateOne(
        { email }, 
        { otp, otpExpiration: Date.now() + 10 * 60 * 1000},  
        { upsert: true } 
    )


    return SuccessResponse(res, 'OTP sent to your email. Please verify to complete registration.', { email });
  } catch (error) {
    console.error('Error during OTP generation:', error);
    return ErrorResponse(res, 'An error occurred while generating the OTP.');
  }
};

export const UserSignup = async (req: Request, res: Response) => {
  try {
    const { email, otp, username, password } = req.body;

    const user = await userSignup.findOne({ email });

    if (!user) {
      return ErrorResponse(res, "No such user found. Please initiate signup first.");
    }

    if (user.otp !== otp) {
      return ErrorResponse(res, "Invalid OTP.");
    }
    if (user.otpExpiration && Date.now() > user.otpExpiration) {
      return ErrorResponse(res, "OTP expired. Please request a new one.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.username = username;
    user.otp = undefined; 
    user.otpExpiration = undefined; 
    user.status = 1; 

    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id.toHexString() }, env.JWT_SECRET, { expiresIn: '2d' });

    return SuccessResponse(res, "User registered successfully", { user: savedUser, token });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred during OTP verification.");
  }
}

export const UserSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await userSignup.findOne({ email });
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }
    if (!user.password) {
      return ErrorResponse(res, "Password is not set for this user.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return ErrorResponse(res, "Invalid password.");
    }

    const token = jwt.sign({ id: user._id.toHexString() }, env.JWT_SECRET, { expiresIn: '2d' });

    await userSignup.updateOne(
      { _id: user._id }, 
      { $set: { status: 1 } } 
    );

    return SuccessResponse(res, "User logged in successfully", {user, token});
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while logging in.");
  }
};

export const UserLogout = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return ErrorResponse(res, "User ID is required.");
    }

    await userSignup.updateOne(
      { _id: userId },
      { $set: { status: 0 } }
    );

    return SuccessResponse(res, "User logged out successfully.", { userId });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while logging out.");
  }
}

export const UserOtpForPass = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userSignup.findOne({ email });
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    await sendPassResetEmail({ email, OTP: otp }),
    await userSignup.updateOne(
        { email }, 
        { otp, otpExpiration: Date.now() + 10 * 60 * 1000},  
        { upsert: true } 
    )

    return SuccessResponse(res, 'OTP sent to your email. Please verify to complete password reset.', { email });
    
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while generating the OTP.");
  }
}

export const UserUpdatePass = async (req: Request, res: Response) => {
  try {
    const { email, otp, password } = req.body;

    const user = await userSignup.findOne({ email });
    if (!user) {
      return ErrorResponse(res, "User not found.");
    }
    if (user.otp !== otp) {
      return ErrorResponse(res, "Invalid OTP.");
    }
    if (user.otpExpiration && Date.now() > user.otpExpiration) {
      return ErrorResponse(res, "OTP expired. Please request a new one.");
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiration = undefined; 
    await user.save();

    return SuccessResponse(res, "Password updated successfully.", { user });
  }
  catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while updating the password.");
  }
}

export const getProductData = async (req: Request, res: Response) => {
  try {
    const page = req.body.page || null; 
    const limit = req.body.limit || null; 

    const skip = (page - 1) * limit;
    
    const product = await addProducts
    .find({})
    .skip(skip)
    .limit(limit)
    .lean();

    return SuccessResponse(res, "Product found successfully.", { product });
  } catch (error) {
    console.error(error);
    return ErrorResponse(res, "An error occurred while finding the product.");
  }
  }

 
  export const addToCart = async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;
      const productId = req.body.productId;
      const insert_date_time = moment().format("YYYY-MM-DD HH:mm:ss");
  
      const product = await addProducts.findById(productId);
      if (!product) {
        return ErrorResponse(res, "Product not found.");
      }
      const user = await userSignup.findById(userId);
      if (!user) {
        return ErrorResponse(res, "User not found.");
      }
      const cartItem = await cart.findOne({ userId, productId });
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        await cart.create({ userId, productId, quantity: 1, insert_date_time, });
      }

      const updatedCart = await cart
        .find({ userId })
        .populate({
          path: 'productId', 
          model: 'addProduct_admin', 
          select: 'productName price image description category',
        })
        .populate({
          path: 'userId',
          model: 'signup_user',
          select: 'username email'
        })
        .exec();
  
      return SuccessResponse(res, "Product added to cart successfully.", {
        cart: updatedCart
      });
    } catch (error) {
      console.error(error);
      return ErrorResponse(res, "An error occurred while adding the product to cart.");
    }
  };
  