import { Router } from 'express';
import {
getAllShops,
getShopById,
createShop,
deleteShop,
updateShop
} from '../controllers/shopController.js';

const router = Router();

router.get('/shops', getAllShops);
router.get('/shops/:shopsId', getShopById);
router.post('/shops', createShop);
router.delete('/shops/:shopsId', deleteShop);
router.patch('/shops/:shopsId', updateShop);

export default router;
