import { Product } from '../models/product.js';
import createHttpError from 'http-errors';

export const getAllProducts = async (req, res, next) => {
  try {
    const {
      shopId,
      category,
      isAvailable,
      ids,
      page = 1,
      perPage = 12,
      sortBy = 'createdAt',
      sortOrder = 'asc',
    } = req.query;

    const filter = {};
    if (shopId) filter.shop = shopId;

    if (category && category.length > 0) {
      filter.category = { $in: category };
    }

    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

    if (ids && ids.length > 0) {
      const idsArray = ids.filter(Boolean);
      filter._id = { $in: idsArray };
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(perPage));
    const skip = (pageNum - 1) * limitNum;

    const sortOptions = { isAvailable: -1 };

    if (sortBy === 'category' || sortBy === 'createdAt') {
      sortOptions.category = 1;
      sortOptions.name = 1;
    } else {
      sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
      sortOptions.name = 1;
    }

    const [totalItems, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).sort(sortOptions).skip(skip).limit(limitNum),
    ]);

    res.status(200).json({
      data: products,
      page: pageNum,
      perPage: limitNum,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      hasNextPage: pageNum * limitNum < totalItems,
      hasPreviousPage: pageNum > 1,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('shop', 'name');

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
