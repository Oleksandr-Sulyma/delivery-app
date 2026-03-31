import { Product } from '../models/product.js';
import createHttpError from 'http-errors';

export const getProductsByShop = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const { sortBy, sortOrder = 'asc' } = req.query;

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const products = await Product.find({ shop: shopId }).sort(sortOptions);

    if (!products || products.length === 0) {
      return next(createHttpError(404, 'No products found for this shop'));
    }

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
