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
exports.usersController = void 0;
const users_service_1 = require("../services/users-service");
const users_query_repository_1 = require("../repositories/users-query-repository");
const settings_1 = require("../settings");
class UsersController {
    createUserController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield users_service_1.usersService.createUser(req.body.login, req.body.email, req.body.password);
            const user = users_query_repository_1.usersQueryRepository.mapToOutput(createdUser);
            res
                .status(settings_1.StatusCodes.CREATED_201)
                .json(user);
            return;
        });
    }
    getUsersController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const users = yield users_query_repository_1.usersQueryRepository.getAllUsers(query);
            res
                .status(settings_1.StatusCodes.OK_200)
                .json(users);
        });
    }
    deleteUserController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIsDeleted = yield users_service_1.usersService.deleteUserById(req.params.id);
            if (!userIsDeleted) {
                res
                    .status(settings_1.StatusCodes.NOT_FOUND_404)
                    .send();
                return;
            }
            res
                .status(settings_1.StatusCodes.NO_CONTENT_204)
                .send();
        });
    }
}
exports.usersController = new UsersController();
