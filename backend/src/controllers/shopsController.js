import { Shop } from '../models/shop.js';
import { Product } from '../models/product.js';
import createHttpError from 'http-errors';

export const getAllShops = async (req, res, next) => {
  const {
    page = 1,
    perPage = 12,
    name,
    minRating,
    maxRating,
    sortBy = "rating",
    sortOrder = 'desc'
  } = req.query;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(Math.max(1, Number(perPage)), 100);
  const skip = (pageNum - 1) * limitNum;

  let filter = {};
  if (name) filter.name = { $regex: name, $options: 'i' };

  if (minRating || maxRating) {
    filter.rating = {};
    if (minRating) filter.rating.$gte = Number(minRating);
    if (maxRating) filter.rating.$lte = Number(maxRating);
  }

  try {
    const [total, shops] = await Promise.all([
      Shop.countDocuments(filter),
      Shop.find(filter)
        .skip(skip)
        .limit(limitNum)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    ]);

    res.status(200).json({
      data: shops,
      page: pageNum,
      perPage: limitNum,
      totalItems: total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

export const getShopById = async (req, res, next) => {
  const { shopId } = req.params;
  try {
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(createHttpError(404, 'Shop not found'));
    }
    res.status(200).json(shop);
  } catch (error) {
    next(error);
  }
};

export const getProductsByShop = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const {
      category,
      page = 1,
      perPage = 8,
      sortBy = 'createdAt',
      sortOrder = 'asc'
    } = req.query;

    const filter = { shop: shopId };
    if (category) filter.category = category;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(perPage));
    const skip = (pageNum - 1) * limitNum;

    const [totalItems, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .skip(skip)
        .limit(limitNum)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    ]);

    res.status(200).json({
      data: products,
      page: pageNum,
      perPage: limitNum,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      hasNextPage: pageNum * limitNum < totalItems,
      hasPreviousPage: pageNum > 1
    });
  } catch (error) {
    next(error);
  }
};
