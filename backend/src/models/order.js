import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Order = model("Order", orderSchema);
