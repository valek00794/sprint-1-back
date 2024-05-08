"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const postsController_1 = require("../controllers/postsController");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const postsInputValidation_1 = require("../validation/postsInputValidation");
const commentInputValidation_1 = require("../validation/commentInputValidation");
const commentsController_1 = require("../controllers/commentsController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authJWTMiddleware_1 = require("../middlewares/authJWTMiddleware");
const userIdFromJWTMiddleware_1 = require("../middlewares/userIdFromJWTMiddleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', postsController_1.postsController.getPostsController);
exports.postsRouter.get('/:id', postsController_1.postsController.findPostController);
exports.postsRouter.post('/', authMiddleware_1.authMiddleware, postsInputValidation_1.postsInputValidation, postsInputValidation_1.postsBlogIdInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, postsController_1.postsController.createPostController);
exports.postsRouter.put('/:id', authMiddleware_1.authMiddleware, postsInputValidation_1.postsInputValidation, postsInputValidation_1.postsBlogIdInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, postsController_1.postsController.updatePostController);
exports.postsRouter.delete('/:id', authMiddleware_1.authMiddleware, postsController_1.postsController.deletePostController);
exports.postsRouter.post('/:postId/comments', authJWTMiddleware_1.authJWTMiddleware, commentInputValidation_1.commentInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, commentsController_1.commentsController.createCommentForPostController);
exports.postsRouter.get('/:postId/comments', userIdFromJWTMiddleware_1.userIdFromJWTMiddleware, commentsController_1.commentsController.getCommentsForPostController);
