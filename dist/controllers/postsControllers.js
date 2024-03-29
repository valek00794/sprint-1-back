"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostController = exports.createPostForBlogController = exports.createPostController = exports.deletePostController = exports.findPostsOfBlogController = exports.findPostController = exports.getPostsController = void 0;
const posts_repository_1 = require("../repositories/posts-repository");
const blogs_repository_1 = require("../repositories/blogs-repository");
const settings_1 = require("../settings");
const getPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_repository_1.postsRepository.getPosts(req.query);
    res
        .status(settings_1.CodeResponses.OK_200)
        .json(posts);
});
exports.getPostsController = getPostsController;
const findPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepository.findPost(req.params.id);
    if (!post) {
        res
            .status(settings_1.CodeResponses.NOT_FOUND_404)
            .send();
        return;
    }
    res
        .status(settings_1.CodeResponses.OK_200)
        .json(post);
});
exports.findPostController = findPostController;
const findPostsOfBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepository.findBlog(req.params.blogId);
    if (!blog) {
        res
            .status(settings_1.CodeResponses.NOT_FOUND_404)
            .send();
        return;
    }
    const posts = yield posts_repository_1.postsRepository.getPosts(req.query, req.params.blogId);
    res
        .status(settings_1.CodeResponses.OK_200)
        .json(posts);
});
exports.findPostsOfBlogController = findPostsOfBlogController;
const deletePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postIsDeleted = yield posts_repository_1.postsRepository.deletePost(req.params.id);
    if (!postIsDeleted) {
        res
            .status(settings_1.CodeResponses.NOT_FOUND_404)
            .send();
        return;
    }
    res
        .status(settings_1.CodeResponses.NO_CONTENT_204)
        .send();
});
exports.deletePostController = deletePostController;
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postInsertedId = yield posts_repository_1.postsRepository.createPost(req.body);
    if (!postInsertedId) {
        res
            .status(settings_1.CodeResponses.BAD_REQUEST_400)
            .send();
        return;
    }
    const newPost = yield posts_repository_1.postsRepository.findPost(postInsertedId);
    res
        .status(settings_1.CodeResponses.CREATED_201)
        .json(newPost);
});
exports.createPostController = createPostController;
const createPostForBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepository.findBlog(req.params.blogId);
    if (!blog) {
        res
            .status(settings_1.CodeResponses.NOT_FOUND_404)
            .send();
        return;
    }
    const postInsertedId = yield posts_repository_1.postsRepository.createPost(req.body, req.params.blogId);
    if (!postInsertedId) {
        res
            .status(settings_1.CodeResponses.BAD_REQUEST_400)
            .send();
        return;
    }
    const newPost = yield posts_repository_1.postsRepository.findPost(postInsertedId);
    res
        .status(settings_1.CodeResponses.CREATED_201)
        .json(newPost);
});
exports.createPostForBlogController = createPostForBlogController;
const updatePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdatedPost = yield posts_repository_1.postsRepository.updatePost(req.body, req.params.id);
    if (!isUpdatedPost) {
        res
            .status(settings_1.CodeResponses.NOT_FOUND_404)
            .send();
        return;
    }
    res
        .status(settings_1.CodeResponses.NO_CONTENT_204)
        .send();
});
exports.updatePostController = updatePostController;
