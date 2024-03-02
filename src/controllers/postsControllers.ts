import { Request, Response } from 'express'
import { db } from '../db/db'
import { CreatePostType, OutputPostType } from '../types/post'
import { APIErrorResult, FieldError } from '../types/errors'

const validationErrorsMassages = {
    id: 'Not found video with the requested ID',
};

let apiErrors: FieldError[] = []

export const getPostsController = (req: Request, res: Response<OutputPostType[]>) => {
    res
    .status(200)
    .json(db.posts)
}

export const findPostController = (req: Request, res: Response<APIErrorResult | OutputPostType>) => {
    apiErrors = []
    const postId = db.posts.findIndex(post => post.id === req.params.id)
    if (postId === -1) {
        apiErrors.push({ field: "id", message: validationErrorsMassages.id })
        res
            .status(404)
            .json({
                errorsMessages: apiErrors
            })
    } else {
        res
            .status(200)
            .json(db.posts[postId])
    }
}

export const deletePostController = (req: Request, res: Response<APIErrorResult>) => {
    apiErrors = []
    const postId = db.posts.findIndex(post => post.id === req.params.id)
    if (postId === -1) {
        apiErrors.push({ field: "id", message: validationErrorsMassages.id })
        res
            .status(404)
            .json({
                errorsMessages: apiErrors
            })
    } else {
        db.posts.splice(postId, 1)
        res
            .status(204)
            .send()
    }
}

export const createPostController = (req: Request<CreatePostType>, res: Response<OutputPostType | APIErrorResult>) => {
    const newId = Date.parse(new Date().toISOString()).toString()
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId
    const blogName = db.blogs.find(blog => blog.id === blogId)?.name || ''

    const isValidate = true;
    
    if (isValidate) {
        const newPost: OutputPostType = {
            id: newId,
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName
        }
        db.posts.push(newPost)
        res
            .status(201)
            .json(newPost)
    } else {
        res
            .status(400)
            .json({
                errorsMessages: apiErrors
            })
    }
}
