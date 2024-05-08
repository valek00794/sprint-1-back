"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRouter = void 0;
const express_1 = require("express");
const commentsController_1 = require("../controllers/commentsController");
const commentInputValidation_1 = require("../validation/commentInputValidation");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const authJWTMiddleware_1 = require("../middlewares/authJWTMiddleware");
const userIdFromJWTMiddleware_1 = require("../middlewares/userIdFromJWTMiddleware");
exports.commentsRouter = (0, express_1.Router)();
exports.commentsRouter.get('/:id', userIdFromJWTMiddleware_1.userIdFromJWTMiddleware, commentsController_1.commentsController.findCommentController);
exports.commentsRouter.post('/', authJWTMiddleware_1.authJWTMiddleware, commentsController_1.commentsController.createCommentForPostController);
exports.commentsRouter.delete('/:commentId', authJWTMiddleware_1.authJWTMiddleware, commentsController_1.commentsController.deleteCommentController);
exports.commentsRouter.put('/:commentId', authJWTMiddleware_1.authJWTMiddleware, commentInputValidation_1.commentInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, commentsController_1.commentsController.updateCommentForPostController);
exports.commentsRouter.put('/:commentId/like-status', authJWTMiddleware_1.authJWTMiddleware, commentInputValidation_1.likeStatusInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, commentsController_1.commentsController.changeCommentLikeStatusController);
