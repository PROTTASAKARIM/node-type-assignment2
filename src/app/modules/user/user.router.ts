import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getUserByUserId);
router.put('/:userId', UserControllers.updateUserByUserId);
router.delete('/:userId', UserControllers.deleteUserByUserId);

export const UserRoutes = router;
