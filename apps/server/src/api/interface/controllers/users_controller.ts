import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse, ErrorEmptyResponse } from "./../../helpers/apiResponse";
import { UserSignupData } from "../models/users_model";


export const UserSignup = async (req: Request, res: Response) => {
    try {
      let reqData = {
        username: req.body.username,
        email: req.body.email,  
        password: req.body.password,
      };
      await UserSignupData(reqData, (err: any, response: any) => {
        if (err) {
          return ErrorEmptyResponse(res, err);
        } else {
          return SuccessResponse(res, "Successfully listed", response);
        }
      });
    } catch (e) {
      ErrorResponse(res, e);
    }
  };