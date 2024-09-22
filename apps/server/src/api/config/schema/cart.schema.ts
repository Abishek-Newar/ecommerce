import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        insert_date_time: { type: Date, default: Date.now },
    },
    {
        collection: "cart",
    }
);
export const cart = mongoose.model("cart", cartSchema);