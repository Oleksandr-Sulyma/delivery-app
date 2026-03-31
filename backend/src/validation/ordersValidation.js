import { Joi, Segments } from 'celebrate';
import objectIdValidator from '../middleware/objectIdValidator.js';

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    user: Joi.object({
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
      address: Joi.string().min(5).required(),
    }).required(),

    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().custom(objectIdValidator).required(),
          name: Joi.string().required(),
          quantity: Joi.number().integer().min(1).required(),
          price: Joi.number().positive().precision(2).required(),

        })
      )
      .min(1)
      .required(),
    totalPrice: Joi.number().positive().required(),
  }),
};
