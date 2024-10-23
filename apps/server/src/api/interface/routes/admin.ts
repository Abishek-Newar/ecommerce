import express from "express";
import validateRequest from "../../config/helpers/validateRequest";
import { AddProductValidate, AdminSigninValidate } from "../../config/helpers/validators";
import { addProduct, adminSignin, multiple } from "../controllers/admin_controller";
import { Auth } from "../../lib/jwt";
const route = express.Router();

export const adminRoute = (router: express.Router): void => {

    router.post("/admin/signin", validateRequest(AdminSigninValidate), adminSignin);

    router.post("/admin/addProduct", Auth, validateRequest(AddProductValidate), multiple, addProduct);

}
