import { object, string, number, mixed } from "yup";

export const UserOtpGenerateValidate = object({
  body: object({
    email: string()
      .email("Invalid email format")
      .max(30, "Email cannot exceed 30 characters")
      .required("Email is required"),
  }),
});

export const UserSignupValidate = object({
  body: object({
    otp: number().
    required("OTP is required"),

    username: string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username cannot exceed 20 characters")
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
    })

});

export const UserSigninValidate = object({
  body: object({
    email: string()
      .email("Invalid email format")
      .max(30, "Email cannot exceed 30 characters")
      .required("Email is required"),

    password: string()  
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required"),
  }),
});

export const UserLogoutValidate = object({
  body: object({
    userId : string()
    .required("User ID is required"),
  }),
})

export const AdminSigninValidate = object({
  body: object({
    email: string()
      .email("Invalid email format")
      .max(30, "Email cannot exceed 30 characters")
      .required("Email is required"),

    password: string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required"),
  }),
})

export const AddProductValidate = object({
  body: object({
    productName: string()
      .min(3, "Product name must be at least 3 characters long")
      .max(20, "Product name cannot exceed 20 characters"),

    description: string()
      .min(3, "Description must be at least 3 characters long")
      .max(50, "Description cannot exceed 50 characters"),

    price: number()
      .min(1, "Price must be at least 1"),

    image: string(),

    category: string()
      .min(1, "Category must be at least 1 characters long")
      .max(20, "Category cannot exceed 20 characters"),

    quantity: number()
      .min(1, "Quantity must be at least 1"),
  }),
})

export const UserOtpForPassValidate = object({
  body: object({
    email: string()
      .email("Invalid email format")
      .max(30, "Email cannot exceed 30 characters")
      .required("Email is required"),
  }),
})

export const UserUpdatePassValidate = object({
  body: object({
    email: string()
      .email("Invalid email format")
      .max(30, "Email cannot exceed 30 characters")
      .required("Email is required"),

    otp: number()
      .required("OTP is required"),
      
    password: string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required"),
  }),
})