import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse, ErrorEmptyResponse } from "../../config/helpers/apiResponse";
import {userSignup} from "../../config/schema/userSignup.schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../../infrastructure/env";
import {sendEmail} from "../../lib/mailer";

export const UserOtpGenerate = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const existingUser = await userSignup.findOne({ email });
    if (existingUser) {
      return ErrorResponse(res, 'Email is already registered.');
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendEmail({ email, OTP: otp });

    await userSignup.updateOne(
      { email },
      { otp, otpExpiration: Date.now() + 15 * 60 * 1000 },
      { upsert: true }
    );
    return SuccessResponse(res, 'OTP sent to your email. Please verify to complete registration.', { email });

  } catch (error) {
    console.error('Error during signup initiation:', error);
    return ErrorResponse(res, 'An error occurred during signup initiation.');
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