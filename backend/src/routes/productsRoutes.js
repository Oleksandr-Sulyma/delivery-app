import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
} from '../controllers/productsController.js';
import { celebrate } from 'celebrate';
import {
  ProductIdParamSchema,
  ProductsParamSchema,
} from '../validation/productsValidation.js';

const router = Router();

router.get('/', celebrate(ProductsParamSchema), getAllProducts);
router.get('/:id', celebrate(ProductIdParamSchema), getProductById);

export default router;
