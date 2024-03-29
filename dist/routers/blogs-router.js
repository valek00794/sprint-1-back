"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogsControllers_1 = require("../controllers/blogsControllers");
const blogsInputValidation_1 = require("../validation/blogsInputValidation");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const postsControllers_1 = require("../controllers/postsControllers");
const postsInputValidation_1 = require("../validation/postsInputValidation");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', blogsControllers_1.getBlogsController);
exports.blogsRouter.get('/:id', blogsControllers_1.findBlogController);
exports.blogsRouter.get('/:blogId/posts', postsControllers_1.findPostsOfBlogController);
exports.blogsRouter.post('/:blogId/posts', authMiddleware_1.authMiddleware, postsInputValidation_1.postsInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, postsControllers_1.createPostForBlogController);
exports.blogsRouter.post('/', authMiddleware_1.authMiddleware, blogsInputValidation_1.blogsInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, blogsControllers_1.createBlogController);
exports.blogsRouter.put('/:id', authMiddleware_1.authMiddleware, blogsInputValidation_1.blogsInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, blogsControllers_1.updateBlogController);
exports.blogsRouter.delete('/:id', authMiddleware_1.authMiddleware, blogsControllers_1.deleteBlogController);
