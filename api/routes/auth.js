import express from 'express';
import { createUser, login, logout } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', createUser)


router.post('/login', login)

router.post('/logout', logout)

export default router