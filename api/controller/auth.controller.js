import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js';

export const createUser = async (req, res) => {

    try {
        const { username, password, email } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        console.log(hashedPassword)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })


        return res.status(201).json({
            message: "User is registered",
            data: user
        })
    } catch (e) {
        console.log(e)

        return res.status(500).json({
            error: "Something went wrong"
        })
    }



}

export const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            return res.status(404).json({
                error: "Provided User Not Found"
            })
        }

        const arePasswordsSame = await bcrypt.compare(password, user.password)

        if (!arePasswordsSame) {
            return res.status(401).json({
                error: "Provided password is incorrect"
            })
        }

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
                username,
                id: user.id
            }
        }, process.env.JWT_SECRET);



        const cookie = res.cookie('access_token', token, {
            maxAge: 90000,
            httpOnly: true
        })


        return res.status(200).json({
            message: "User Logged In!",
            user: {
                username, email: user.email
            }
        })
    } catch (e) {
        console.log(e)

        return res.status(500).json({
            error: "User failed to login"
        })
    }

}

export const logout = async (req, res) => {
    return res.clearCookie('access_token').status(201).json({
        message: "logout"
    })
}