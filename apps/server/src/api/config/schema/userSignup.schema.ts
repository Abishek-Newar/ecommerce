import mongoose, { Schema } from "mongoose";

const userSignupSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        insert_date_time: { type: Date, default: Date.now },
        otp: { type: Number },
        otpExpiration: { type: Number },
    },
    {
        collection: "signup_user",
    }
);
export const userSignup = mongoose.model("signup_user", userSignupSchema);