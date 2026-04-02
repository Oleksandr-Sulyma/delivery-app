import { Schema, model } from 'mongoose';

const couponSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    code: { 
      type: String, 
      required: true, 
      unique: true, 
      uppercase: true, 
      trim: true,
      index: true
    },
    discount: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 100 
    },
    imageUrl: { 
      type: String, 
      default: '/coupons/default-promo.webp' 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    expiresAt: { 
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
    }
  },
  {
    timestamps: true,
    versionKey: false, 
  }
);

couponSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Coupon = model('OrderCoupon', couponSchema);