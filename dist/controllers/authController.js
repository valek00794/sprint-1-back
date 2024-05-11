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
exports.AuthController = void 0;
const jwt_adapter_1 = require("../adapters/jwt/jwt-adapter");
const settings_1 = require("../settings");
class AuthController {
    constructor(authService, usersService, usersDevicesService, usersQueryRepository) {
        this.authService = authService;
        this.usersService = usersService;
        this.usersDevicesService = usersDevicesService;
        this.usersQueryRepository = usersQueryRepository;
    }
    signInController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersQueryRepository.findUserByLoginOrEmail(req.body.loginOrEmail);
            if (user === null) {
                res
                    .status(settings_1.StatusCodes.UNAUTHORIZED_401)
                    .send();
                return;
            }
            const checkCredential = yield this.authService.checkCredential(user._id, req.body.password, user.passwordHash);
            if (!checkCredential) {
                res
                    .status(settings_1.StatusCodes.UNAUTHORIZED_401)
                    .send();
                return;
            }
            const tokens = yield jwt_adapter_1.jwtAdapter.createJWT(user._id);
            const deviceTitle = req.headers['user-agent'] || 'unknown device';
            const ipAddress = req.ip || '0.0.0.0';
            yield this.usersDevicesService.addUserDevice(tokens.refreshToken, deviceTitle, ipAddress);
            res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true, });
            res
                .status(settings_1.StatusCodes.OK_200)
                .send({
                accessToken: tokens.accessToken
            });
        });
    }
    getAuthInfoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersQueryRepository.findUserById(req.user.userId);
            if (!req.user || !req.user.userId || !user) {
                res
                    .status(settings_1.StatusCodes.UNAUTHORIZED_401)
                    .send();
                return;
            }
            res
                .status(settings_1.StatusCodes.OK_200)
                .send(user);
        });
    }
    signUpController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersService.signUpUser(req.body.login, req.body.email, req.body.password);
            if (result.status === settings_1.ResultStatus.BadRequest) {
                res
                    .status(settings_1.StatusCodes.BAD_REQUEST_400)
                    .json(result.errors);
                return;
            }
            if (result.status === settings_1.ResultStatus.NoContent) {
                res
                    .status(settings_1.StatusCodes.NO_CONTENT_204)
                    .json();
                return;
            }
        });
    }
    signUpConfimationController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmResult = yield this.authService.confirmEmail(req.body.code);
            if (confirmResult.status === settings_1.ResultStatus.BadRequest) {
                res
                    .status(settings_1.StatusCodes.BAD_REQUEST_400)
                    .send(confirmResult.data);
                return;
            }
            if (confirmResult.status === settings_1.ResultStatus.NoContent) {
                res
                    .status(settings_1.StatusCodes.NO_CONTENT_204)
                    .send();
                return;
            }
        });
    }
    signUpEmailResendingController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sendResult = yield this.authService.resentConfirmEmail(req.body.email);
            if (sendResult.status === settings_1.ResultStatus.BadRequest) {
                res
                    .status(settings_1.StatusCodes.BAD_REQUEST_400)
                    .send(sendResult.errors);
                return;
            }
            if (sendResult.status === settings_1.ResultStatus.NoContent) {
                res
                    .status(settings_1.StatusCodes.NO_CONTENT_204)
                    .send();
                return;
            }
        });
    }
    refreshTokenController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldRefreshToken = req.cookies.refreshToken;
            const renewResult = yield this.authService.renewTokens(oldRefreshToken);
            if (renewResult.status === settings_1.ResultStatus.Unauthorized) {
                res
                    .status(settings_1.StatusCodes.UNAUTHORIZED_401)
                    .send();
                return;
            }
            if (renewResult.status === settings_1.ResultStatus.Success) {
                yield this.usersDevicesService.updateUserDevice(oldRefreshToken, renewResult.data.refreshToken);
                res.cookie('refreshToken', renewResult.data.refreshToken, { httpOnly: true, secure: true, });
                res
                    .status(settings_1.StatusCodes.OK_200)
                    .send({
                    accessToken: renewResult.data.accessToken
                });
                return;
            }
        });
    }
    logoutController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            const logoutResult = yield this.authService.logoutUser(refreshToken);
            if (logoutResult.status === settings_1.ResultStatus.Unauthorized) {
                res
                    .status(settings_1.StatusCodes.UNAUTHORIZED_401)
                    .send();
                return;
            }
            if (logoutResult.status === settings_1.ResultStatus.NoContent) {
                res
                    .status(settings_1.StatusCodes.NO_CONTENT_204)
                    .send();
                return;
            }
        });
    }
    passwordRecoveryController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersService.passwordRecovery(req.body.email);
            if (result.status === settings_1.ResultStatus.NoContent) {
                res
                    .status(settings_1.StatusCodes.NO_CONTENT_204)
                    .send();
                return;
            }
        });
    }
    confirmPasswordRecoveryController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersService.confirmPasswordRecovery(req.body.recoveryCode, req.body.newPassword);
            if (result.status === settings_1.ResultStatus.BadRequest) {
                res
                    .status(settings_1.StatusCodes.BAD_REQUEST_400)
                    .send(result.errors);
                return;
            }
            if (result.status === settings_1.ResultStatus.NoContent) {
                res
                    .status(settings_1.StatusCodes.NO_CONTENT_204)
                    .send();
                return;
            }
        });
    }
}
exports.AuthController = AuthController;
