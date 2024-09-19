import { object, string, number, mixed } from "yup";

export const UserSignupValidate = object({
  body: object({
    username: string()
      .min(3, "Username must be at least 3 characters long")
      .max(30, "Username cannot exceed 30 characters")
      .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
      .required("Username is required"),

    email: string()
      .email("Invalid email format")
      .max(30, "Email cannot exceed 30 characters")
      .required("Email is required"),

    password: string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      // )
      .required("Password is required"),
  }),
});

export const UserSigninValidate = object({
  body: object({
    email: string()
      .email("Invalid email format")
      .required("Email is required"),

    password: string()  
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required"),
  }),
});