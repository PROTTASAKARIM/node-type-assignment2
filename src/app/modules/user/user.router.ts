import express from 'express';
import { UserControllers } from './user.controller';
import cryptPassword from '../../middlewares/passwordCrypt';
const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getUserByUserId);
router.put('/:userId', cryptPassword, UserControllers.updateUserByUserId);
router.put('/:userId/orders', UserControllers.updateUserOrdersByUserId);
router.get('/:userId/orders', UserControllers.getUserOrdersByUserId);
router.get('/:userId/orders/total-price', UserControllers.getUserOrdersTotalPriceByUserId);
router.delete('/:userId', UserControllers.deleteUserByUserId);

export const UserRoutes = router;
