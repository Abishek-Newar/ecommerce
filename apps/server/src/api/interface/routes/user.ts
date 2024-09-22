import express from "express";
import { UserLogoutValidate, UserOtpForPassValidate, UserOtpGenerateValidate, UserSigninValidate, UserSignupValidate, UserUpdatePassValidate } from "../../config/helpers/validators";
import validateRequest from "../../config/helpers/validateRequest";
import { addToCart, getProductData, UserLogout, UserOtpForPass, UserOtpGenerate, UserSignin, UserSignup, UserUpdatePass } from "../controllers/users_controller";
const route = express.Router();

export const UserRoute = (router: express.Router): void => {

    router.get("/user/", (req, res) => {
        res.send("user route is working")
    })
    // for user to signup generate otp
    router.post("/user/generateOtp", validateRequest(UserOtpGenerateValidate), UserOtpGenerate);

    router.post("/user/signup", validateRequest(UserSignupValidate), UserSignup);

    router.post("/user/signin", validateRequest(UserSigninValidate), UserSignin);

    router.post("/user/logout", validateRequest(UserLogoutValidate), UserLogout);

    // for user to reset password generate otp
    router.post("/user/OTPforPass", validateRequest(UserOtpForPassValidate), UserOtpForPass);

    router.post("/user/updatePass", validateRequest(UserUpdatePassValidate), UserUpdatePass);

    router.post("/user/getProducts", getProductData)

    router.post("/user/addToCart", addToCart)

}
