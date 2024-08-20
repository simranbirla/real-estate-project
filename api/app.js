import express from 'express';
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'

const app = express()

app.use(express.json())


app.use('/auth', authRouter)
app.use('/post', postRouter)

app.listen(3000, () => {
    console.log("Started Listening")
})