import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../helpers/apiResponse";

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return ErrorResponse(res, errorMessage);
  }
};

export default validate;
