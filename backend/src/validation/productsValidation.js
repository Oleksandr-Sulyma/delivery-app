import { Joi, Segments } from 'celebrate';
import objectIdValidator from '../middleware/objectIdValidator.js';

export const ProductsParamSchema = {
  [Segments.QUERY]: Joi.object({
  shopId: Joi.string().custom(objectIdValidator).required(),
  category: Joi.string().valid('Burgers', 'Pizzas', 'Drinks', 'Sushi', 'Desserts'),
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid('price', 'name', 'rating', 'createdAt').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
})};

export const ProductIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};
