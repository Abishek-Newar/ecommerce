import express from "express";
import { UserLogoutValidate, UserOtpGenerateValidate, UserSigninValidate, UserSignupValidate } from "../../config/helpers/validators";
import validateRequest from "../../config/helpers/validateRequest";
import { UserLogout, UserOtpGenerate, UserSignin, UserSignup } from "../controllers/users_controller";
const route = express.Router();

export const UserRoute = (router: express.Router): void => {

    router.post("/user/generateOtp", validateRequest(UserOtpGenerateValidate), UserOtpGenerate);

    router.post("/user/signup", validateRequest(UserSignupValidate), UserSignup);

    router.post("/user/signin", validateRequest(UserSigninValidate), UserSignin);

    router.post("/user/logout", validateRequest(UserLogoutValidate), UserLogout);


}
