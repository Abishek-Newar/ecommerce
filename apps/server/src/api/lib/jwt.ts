import { env } from "../../infrastructure/env";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { unauthorizedResponse, notFoundResponse, ErrorEmptyResponse } from "../helpers/apiResponse";
import { Constants } from "../config/constants";

const privateKey = env.JWT_SECRET as string;

/**
 * jwt signin
 * @param {string} value
 */
export function sign(object: Object, expiresIn: any, options?: jwt.SignOptions | undefined) {
  const jwtData = {
    expiresIn: expiresIn,
  };
  return jwt.sign(object, privateKey, jwtData);
}

/**
 * jwt decode
 * @param {string} value
 */
export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error,
      decoded: null,
    };
  }
}

/**
 * generate random unique string
 * @param {string} value
 */

export const verifyTokenSME = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken: any = req.headers.authentication;
    if (accessToken) {
      const token = accessToken.split(" ")[1];
      const { decoded, expired } = decode(token);
      if (decoded) {
        // @ts-ignore
        req.body.user = decoded;
  
        /*const match = req.path.match(/\/sme\/(\d+)/);
        if (match) {
          const smeIdInURL = match[1];
          console.log(smeIdInURL,decoded.username)
          if (smeIdInURL != decoded.username) {
            return res.send({ status: 400, message: "Wrong SME_ID provided" })
          }
        }*/
  
        if (["client", "agent", "admin", "reseller", "teamlead", "voicelogger", "campaignsupervisor", "operator"].includes(req.body.user.ROLE)) {
          if (req.body.username != undefined) {
            if (req.body.username != "") {
              if (req.body.username != req.body.user.username) {
                notFoundResponse(res, Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_INVALID_WITH_USERID);
              } else {
                return next();
              }
            } else {
              return next();
            }
          } else {
            return next();
          }
        } else {
          ErrorEmptyResponse(res, Constants.ERROR_MESSAGES.PERMISSION_ACCESS_CLIENT);
        }
      }
      if (expired) {
        unauthorizedResponse(res, Constants.ERROR_MESSAGES.AUTHORIZATION_TOKEN_EXPIRED);
      }
    } else {
      unauthorizedResponse(res, Constants.ERROR_MESSAGES.AUTHORIZATION_REQUIRED);
    }
  };
  

