import express from "express";
import { UserSigninValidate, UserSignupValidate } from "../../config/helpers/validators";
import validateRequest from "../../config/helpers/validateRequest";
import { UserOtpGenerate, UserSignin, UserSignup } from "../controllers/users_controller";
const route = express.Router();

export const UserRoute = (router: express.Router): void => {

    router.post("/user/generateOtp", UserOtpGenerate);

    router.post("/user/signup", UserSignup);

    router.post("/user/signin", validateRequest(UserSigninValidate), UserSignin);

    


}
