"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogsInputValidation_1 = require("../validation/blogsInputValidation");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const postsInputValidation_1 = require("../validation/postsInputValidation");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const composition_root_1 = require("../composition-root");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', composition_root_1.blogsController.getBlogsController.bind(composition_root_1.blogsController));
exports.blogsRouter.get('/:id', composition_root_1.blogsController.findBlogController.bind(composition_root_1.blogsController));
exports.blogsRouter.get('/:blogId/posts', composition_root_1.postsController.findPostsOfBlogController.bind(composition_root_1.postsController));
exports.blogsRouter.post('/:blogId/posts', authMiddleware_1.authMiddleware, postsInputValidation_1.postsInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, composition_root_1.postsController.createPostForBlogController.bind(composition_root_1.postsController));
exports.blogsRouter.post('/', authMiddleware_1.authMiddleware, blogsInputValidation_1.blogsInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, composition_root_1.blogsController.createBlogController.bind(composition_root_1.blogsController));
exports.blogsRouter.put('/:id', authMiddleware_1.authMiddleware, blogsInputValidation_1.blogsInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, composition_root_1.blogsController.updateBlogController.bind(composition_root_1.blogsController));
exports.blogsRouter.delete('/:id', authMiddleware_1.authMiddleware, composition_root_1.blogsController.deleteBlogController.bind(composition_root_1.blogsController));
