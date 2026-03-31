import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getAllShops, getShopById, getProductsByShop } from '../controllers/shopsController.js';
import {
  getAllShopsSchema,
  shopIdSchema,
  getShopProductsSchema,
} from '../validation/shopValidation.js';

const router = Router();

router.get('/', celebrate(getAllShopsSchema), getAllShops);
router.get('/:shopId', celebrate(shopIdSchema), getShopById);
router.get('/:shopId/products', celebrate(getShopProductsSchema), getProductsByShop);

export default router;
