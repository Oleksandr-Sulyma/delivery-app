import { Schema, model } from "mongoose";

const shopSchema = new Schema (
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1.0,
      max: 5.0,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Shop = model('Shop', shopSchema);
