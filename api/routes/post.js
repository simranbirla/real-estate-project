import express from 'express';
import { createPost, deletePostById, getPostById, getPosts, updatePostById } from '../controller/post.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/', getPosts)
router.get('/:id', getPostById)
router.post('/', verifyToken, createPost)
router.put('/:id', verifyToken, updatePostById)
router.delete('/:id', verifyToken, deletePostById)



export default router