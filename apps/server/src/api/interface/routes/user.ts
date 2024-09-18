import express from "express";
import { verifyTokenSME } from "../../lib/jwt";
import { UserSignupValidate } from "../../helpers/validators";
import validateRequest from "../../helpers/validateRequest";
import { UserSignup } from "../controllers/users_controller";
const route = express.Router();

export const UserRoute = (router: express.Router): void => {

    router.post("/user/signup",// verifyTokenSME,
                validateRequest(UserSignupValidate),
                UserSignup);

}
