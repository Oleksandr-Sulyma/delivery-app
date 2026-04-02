import { Joi, Segments } from 'celebrate';

export const couponBodySchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    code: Joi.string()
      .pattern(/^[A-Z0-9_-]{3,15}$/)
      .required()
      .uppercase(),
    discount: Joi.number().min(1).max(100).required(),
    imageUrl: Joi.string().uri().allow('', null),
    isActive: Joi.boolean(),
    expiresAt: Joi.date().greater('now'),
  }),
};

export const couponParamsSchema = {
  [Segments.PARAMS]: Joi.object({
    code: Joi.string().required().min(3).max(15).uppercase(),
  }),
};