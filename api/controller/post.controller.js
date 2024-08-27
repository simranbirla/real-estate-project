import prisma from '../lib/prisma.js';
import { errorHandler, successRequest } from '../utils/request-utils.js';

export const createPost = async (req, res, next) => {
    try {
        const post = await prisma.post.create({
            data: {
                ...req.body.postData,
                userId: req.userId,
                postDetails: {
                    create: {
                        ...req.body.postDetails
                    }
                }
            }
        });

        return successRequest(res, 200, post)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                postDetails: true,
                user: true,
            }
        });

        return successRequest(res, 200, posts)
    } catch (e) {
        next(e)
    }
}

export const getPostById = async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                postDetails: true,
                user: true
            }
        });

        if (!post) {
            throw errorHandler("Post not found", 404)
        }

        return successRequest(res, 200, post)
    } catch (e) {
        console.log("error", e)
        next(e)
    }
}

export const updatePostById = async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                postDetails: true,
            }
        });


        if (!post) {
            throw errorHandler('Post not found', 404)
        }

        if (post.userId !== req.userId) {
            throw errorHandler("You are not authorized", 403)
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: req.params.id
            },
            data: {
                ...req.body.postData,
                postDetails: {
                    update: {
                        where: {
                            id: post.postDetails.id
                        },
                        data: {
                            ...req.body.postDetails
                        }
                    }
                }
            },
            include: {
                postDetails: true
            }
        })

        return successRequest(res, 200, updatedPost)
    } catch (e) {
        next(e)
    }
}


export const deletePostById = async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });

        if (!post) {
            next("Post not found", 404)
        }

        if (post.userId !== req.userId) {
            next("You are not authorized", 403)
        }

        const deletedPostDetails = await prisma.post.update({
            where: {
                id: req.params.id
            },
            data: {
                postDetails: {
                    deleteMany: {}
                }
            }
        })
        const deletedPost = await prisma.post.delete({
            where: {
                id: req.params.id
            }
        })

        return successRequest(res, 201, deletedPost)
    } catch (e) {
        next(e)
    }
}