import express from 'express';
import { deleteUserById, getAllPostsByUserId, getAllUsers, getUserById, savePosts, updateUserById } from '../controller/user.controller.js';
import { verifyToken, verifyUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', verifyToken, verifyUser, getUserById)
router.put("/:id", verifyToken, verifyUser, updateUserById)
router.post("/post/save-post", verifyToken, savePosts)
router.get("/post/get-post", verifyToken, getAllPostsByUserId)
router.delete('/:id', verifyToken, verifyUser, deleteUserById)

export default router