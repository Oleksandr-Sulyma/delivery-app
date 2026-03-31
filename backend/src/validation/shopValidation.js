import { Joi, Segments } from 'celebrate';
import objectIdValidator from '../middleware/objectIdValidator.js';

export const getAllShopsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
    name: Joi.string().min(1).optional(),
    minRating: Joi.number().min(1).max(5).optional(),
    maxRating: Joi.number().min(1).max(5).optional(),
    sortBy: Joi.string().valid('rating', 'name', 'createdAt').default('rating'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};

export const shopIdSchema = {
  [Segments.PARAMS]: Joi.object({
    shopId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getShopProductsSchema = {
  [Segments.PARAMS]: Joi.object({
    shopId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.QUERY]: Joi.object({
    category: Joi.string().valid('Burgers', 'Pizzas', 'Drinks', 'Sushi', 'Desserts').optional(),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(8),
    sortBy: Joi.string().valid('price', 'name', 'createdAt').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};
