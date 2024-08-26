import prisma from '../lib/prisma.js';
import { successRequest } from '../utils/request-utils.js';

export const createPost = async (req, res) => {
    try {
        const post = await prisma.post.create({ ...req.body });

        return successRequest(res, 200, post)
    } catch (e) {
        console.log(e)
        next("Something went wrong", 500)
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({});

        return successRequest(res, 200, posts)
    } catch (e) {
        console.log(e)
        next("Something went wrong", 500)
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });

        return successRequest(res, 200, post)
    } catch (e) {
        console.log(e)
        next("Something went wrong", 500)
    }
}

export const updatePostById = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });


        if (!post) {
            next("Post not found", 404)
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
        console.log(e)
        next("Something went wrong", 500)
    }
}


export const deletePostById = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });


        if (!post) {
            next("Post not found", 404)
        }

        const deletedPost = await prisma.post.delete({
            where: req.params.id
        })

        return successRequest(res, 201, deletedPost)
    } catch (e) {
        console.log(e)
        next("Something went wrong", 500)
    }
}