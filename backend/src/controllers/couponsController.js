import { Coupon } from '../models/coupon.js';
import createHttpError from 'http-errors';

export const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({ 
      isActive: true,
      expiresAt: { $gt: new Date() } 
    }).sort({ createdAt: -1 });

    res.status(200).json(coupons);
  } catch (error) {
    next(error);
  }
};

export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;
    
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      expiresAt: { $gt: new Date() }
    });

    if (!coupon) {
      throw createHttpError(404, 'Invalid or expired coupon code');
    }

    res.status(200).json({
      name: coupon.name,
      discount: coupon.discount
    });
  } catch (error) {
    next(error);
  }
};

export const createCoupon = async (req, res, next) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    next(error);
  }
};