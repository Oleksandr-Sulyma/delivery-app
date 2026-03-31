import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createOrder, getOrderHistory } from '../controllers/ordersController.js';
import { createOrderSchema } from '../validation/ordersValidation.js';

const router = Router();

router.post('/', celebrate(createOrderSchema), createOrder);
router.get('/history', getOrderHistory);

export default router;
