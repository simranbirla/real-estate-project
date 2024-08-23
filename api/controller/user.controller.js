import prisma from '../lib/prisma.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }
}

export const updateUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })

        return res.status(200).json({
            data: updatedUser
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        await prisma.user.delete({
            where: {
                id: req.params.id
            },
        })

        return res.status(201).json({
            data: user
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }
}