import { object, string, number, mixed } from "yup";

export const UserSignupValidate = object({
  body: object({
    username: string().required(),
    email: string().required(),
    password: string().required(),
  }),
});