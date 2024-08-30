import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken'
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
        const query = req.query


        const posts = await prisma.post.findMany({
            include: {
                postDetails: true,
                user: true,
            },
            where: {
                AND: [
                    {
                        city: query?.city || undefined,
                    },
                    {
                        type: query?.type || undefined,
                    },
                    {
                        property: query?.property || undefined,
                    },
                    {
                        bedroom: parseInt(query?.bedroom) || undefined,
                    },
                    {
                        price: {
                            gte: parseInt(query?.minPrice) || 0,
                            lte: parseInt(query?.maxPrice) || 10000000,
                        }
                    }
                ]
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

        const token = req.cookies?.access_token;

        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET, async function (err, payload) {
                if (err) {
                    throw errorHandler("Something went wrong", 401)
                }


                const savedPost = await prisma.savedPost.findUnique({
                    where: {
                        userId_postId: {
                            userId: payload.data.id,
                            postId: req.params.id
                        }
                    }
                })

                if (savedPost) {
                    return successRequest(res, 200, {
                        ...post, isSaved: true
                    })
                } else {
                    return successRequest(res, 200, {
                        ...post, isSaved: false
                    })
                }
            });
        }


        return successRequest(res, 200, {
            ...post, isSaved: false,
        })
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