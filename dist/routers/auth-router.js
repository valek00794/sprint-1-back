"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authInputValidation_1 = require("../validation/authInputValidation");
const authController_1 = require("../controllers/authController");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const authJWTMiddleware_1 = require("../middlewares/authJWTMiddleware");
const usersInputValidation_1 = require("../validation/usersInputValidation");
const apiRequestsLogMiddleware_1 = require("../middlewares/apiRequestsLogMiddleware");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', apiRequestsLogMiddleware_1.apiRequestsLogMiddleware, apiRequestsLogMiddleware_1.apiRequestsCounterMiddleware, authInputValidation_1.authInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, authController_1.signInController);
exports.authRouter.get('/me', authJWTMiddleware_1.authJWTMiddleware, authController_1.getAuthInfoController);
exports.authRouter.post('/registration', apiRequestsLogMiddleware_1.apiRequestsLogMiddleware, apiRequestsLogMiddleware_1.apiRequestsCounterMiddleware, usersInputValidation_1.userDataInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, authController_1.signUpController);
exports.authRouter.post('/registration-confirmation', apiRequestsLogMiddleware_1.apiRequestsLogMiddleware, apiRequestsLogMiddleware_1.apiRequestsCounterMiddleware, usersInputValidation_1.confirmationCodeInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, authController_1.signUpConfimationController);
exports.authRouter.post('/registration-email-resending', apiRequestsLogMiddleware_1.apiRequestsLogMiddleware, apiRequestsLogMiddleware_1.apiRequestsCounterMiddleware, usersInputValidation_1.emailInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, authController_1.signUpEmailResendingController);
exports.authRouter.post('/refresh-token', authController_1.refreshTokenController);
exports.authRouter.post('/logout', authController_1.logoutController);
exports.authRouter.post('/password-recovery', apiRequestsLogMiddleware_1.apiRequestsLogMiddleware, apiRequestsLogMiddleware_1.apiRequestsCounterMiddleware, usersInputValidation_1.emailInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, authController_1.passwordRecoveryController);
exports.authRouter.post('/new-password', apiRequestsLogMiddleware_1.apiRequestsLogMiddleware, apiRequestsLogMiddleware_1.apiRequestsCounterMiddleware, usersInputValidation_1.recoveryCodeInputValidation, inputValidationMiddleware_1.inputValidationMiddleware, authController_1.confirmPasswordRecoveryController);
