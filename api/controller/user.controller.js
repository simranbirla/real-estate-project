import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import { errorHandler, successRequest } from '../utils/request-utils.js';

export const getAllUsers = async (req, res, next) => {
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

export const getUserById = async (req, res, next) => {
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
        next(e)
    }
}

export const updateUserById = async (req, res, next) => {
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

        let passwordObj = {};

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            passwordObj = {
                password: hashedPassword
            }
        }


        const { password, ...updatedUser } = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                username: req.body.username,
                email: req.body.email,
                avatar: req.body.avatar,
                ...passwordObj
            }
        })

        return res.status(200).json({
            success: true,
            data: updatedUser
        })

    } catch (e) {
        next(e)
    }
}

export const deleteUserById = async (req, res, next) => {
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
        next(e)
    }
}

export const savePosts = async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.body.postId
            }
        })

        if (!post) {
            throw errorHandler("Post not found", 404)
        }

        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: req.userId,
                    postId: req.body.postId
                }
            }
        })


        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    userId_postId: {
                        userId: req.userId,
                        postId: req.body.postId
                    }
                }
            })

            return successRequest(res, 201, {
                savedPost: false
            })
        } else {
            const savedPosts = await prisma.savedPost.create({
                data: {
                    userId: req.userId,
                    postId: req.body.postId
                }
            })
            return successRequest(res, 200, {
                savedPost: true,
            })
        }


    } catch (e) {
        console.log(e)
        next(e)
    }
}