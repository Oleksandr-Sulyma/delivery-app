import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createOrder, getOrderHistory, getOrderById } from '../controllers/ordersController.js';
import { createOrderSchema, getOrderByIdSchema } from '../validation/ordersValidation.js';

const router = Router();

router.post('/', celebrate(createOrderSchema), createOrder);
router.get('/history', getOrderHistory);
router.get('/:id', celebrate(getOrderByIdSchema), getOrderById);

export default router;
