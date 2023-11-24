import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getUserByUserId);
router.put('/:userId', UserControllers.updateUserByUserId);

export const UserRoutes = router;
