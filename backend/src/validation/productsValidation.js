import { Joi, Segments } from 'celebrate';
import objectIdValidator from '../middleware/objectIdValidator.js';

export const ProductsParamSchema = {
  [Segments.QUERY]: Joi.object({
    shopId: Joi.string().custom(objectIdValidator),
    category: Joi.array().items(
      Joi.string().valid('Burgers', 'Pizzas', 'Drinks', 'Sushi', 'Desserts'),
    ).single(),
    isAvailable: Joi.boolean(),
    ids: Joi.array().items(
      Joi.string().custom(objectIdValidator),
    ).single(),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(12),
    sortBy: Joi.string()
      .valid('price', 'name', 'rating', 'createdAt')
      .default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }).or('shopId', 'ids'),
};

export const ProductIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};
