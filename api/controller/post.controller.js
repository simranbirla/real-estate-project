import prisma from '../lib/prisma.js';
import { errorHandler, successRequest } from '../utils/request-utils.js';

export const createPost = async (req, res, next) => {
    try {
        const post = await prisma.post.create({
            data: {
                ...req.body,
                userId: req.userId
            }
        });

        return successRequest(res, 200, post)
    } catch (e) {
        next(e)
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({});

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
            }
        });

        if (!post) {
            throw new Error("Cannot find the post")
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
            }
        });


        if (!post) {
            next("Post not found", 404)
        }

        if (post.userId !== req.userId) {
            next("You are not authorized", 403)
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: req.params.id
            },
            data: {
                ...req.body
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