import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getAllCoupons, validateCoupon, createCoupon } from '../controllers/couponsController.js';
import { couponBodySchema, couponParamsSchema } from '../validation/couponsValidation.js';

const router = Router();

router.get('/', getAllCoupons);

router.get(
  '/validate/:code', 
  celebrate(couponParamsSchema), 
  validateCoupon
);

router.post(
  '/', 
  celebrate(couponBodySchema), 
  createCoupon
);

export default router;