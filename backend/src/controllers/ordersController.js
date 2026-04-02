import { Order } from '../models/order.js';
import { Coupon } from '../models/coupon.js';
import createHttpError from 'http-errors';

export const createOrder = async (req, res, next) => {
  try {
    const { user, items, totalPrice, couponCode } = req.body;

    if (!user || !items?.length) {
      throw createHttpError(400, 'User data and cart items are required');
    }

    const newOrder = await Order.create({
      user,
      items,
      totalPrice,
      couponCode,
    });

    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode.toUpperCase() },
        { isActive: false }
      );
    }

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrderHistory = async (req, res, next) => {
  try {
    const { email, phone } = req.query;

    if (!email || !phone) {
      throw createHttpError(
        400,
        'Email and phone are required to find history'
      );
    }

    const orders = await Order.find({
      'user.email': email,
      'user.phone': phone,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      throw createHttpError(404, 'Order not found');
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};