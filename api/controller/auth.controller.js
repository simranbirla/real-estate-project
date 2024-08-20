import bcrypt from 'bcrypt';
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
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
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

    return res.json({
        message: "Login"
    })
}

export const logout = async (req, res) => {
    return res.json({
        message: "logout"
    })
}