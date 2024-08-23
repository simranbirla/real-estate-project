import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import userRouter from './routes/user.js'
import { verifyToken } from './middlewares/auth.middleware.js';

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))


app.use('/test', verifyToken, (req, res) => {
    return res.json({
        message: "done"
    })
})

app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)


app.listen(3000, () => {
    console.log("Started Listening")
})