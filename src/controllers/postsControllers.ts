import { Request, Response } from 'express'

import { PaginatorPostViewType, PostViewType } from '../types/posts-types'
import { postsRepository } from '../repositories/posts-repository';
import { blogsRepository } from '../repositories/blogs-repository';
import { CodeResponses } from '../settings';

export const getPostsController = async (req: Request, res: Response<PaginatorPostViewType>) => {
    const posts = await postsRepository.getPosts(req.query)
    res
        .status(CodeResponses.OK_200)
        .json(posts)
}

export const findPostController = async (req: Request, res: Response<false | PostViewType>) => {
    const post = await postsRepository.findPost(req.params.id)
    if (!post) {
        res
            .status(CodeResponses.NOT_FOUND_404)
            .send()
        return
    }
    res
        .status(CodeResponses.OK_200)
        .json(post)
}

export const findPostsOfBlogController = async (req: Request, res: Response<PaginatorPostViewType>) => {
    const blog = await blogsRepository.findBlog(req.params.blogId)
    if (!blog) {
        res
            .status(CodeResponses.NOT_FOUND_404)
            .send()
        return
    }
    const posts = await postsRepository.getPosts(req.query, req.params.blogId)
    res
        .status(CodeResponses.OK_200)
        .json(posts)
}

export const deletePostController = async (req: Request, res: Response) => {
    const postIsDeleted = await postsRepository.deletePost(req.params.id)
    if (!postIsDeleted) {
        res
            .status(CodeResponses.NOT_FOUND_404)
            .send()
        return
    }
    res
        .status(CodeResponses.NO_CONTENT_204)
        .send()
}

export const createPostController = async (req: Request, res: Response<false | PostViewType>) => {
    const postInsertedId = await postsRepository.createPost(req.body)
    if (!postInsertedId) {
        res
            .status(CodeResponses.BAD_REQUEST_400)
            .send()
        return
    }
    const newPost = await postsRepository.findPost(postInsertedId)
    res
        .status(CodeResponses.CREATED_201)
        .json(newPost)
}

export const createPostForBlogController = async (req: Request, res: Response<false | PostViewType>) => {
    const blog = await blogsRepository.findBlog(req.params.blogId)
    if (!blog) {
        res
            .status(CodeResponses.NOT_FOUND_404)
            .send()
        return
    }
    const postInsertedId = await postsRepository.createPost(req.body, req.params.blogId)
    if (!postInsertedId) {
        res
            .status(CodeResponses.BAD_REQUEST_400)
            .send()
        return
    }
    const newPost = await postsRepository.findPost(postInsertedId)
    res
        .status(CodeResponses.CREATED_201)
        .json(newPost)
}

export const updatePostController = async (req: Request, res: Response) => {
    const isUpdatedPost = await postsRepository.updatePost(req.body, req.params.id)
    if (!isUpdatedPost) {
        res
            .status(CodeResponses.NOT_FOUND_404)
            .send()
        return
    }
    res
        .status(CodeResponses.NO_CONTENT_204)
        .send()
}
