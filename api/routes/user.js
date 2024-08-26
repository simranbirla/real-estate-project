import express from 'express';
import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controller/user.controller.js';
import { verifyToken, verifyUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', verifyToken, verifyUser, getUserById)
router.put("/:id", verifyToken, verifyUser, updateUserById)
router.delete('/:id', verifyToken, verifyUser, deleteUserById)

export default router