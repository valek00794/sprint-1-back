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
exports.usersRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const users_query_repository_1 = require("./users-query-repository");
exports.usersRepository = {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersCollection.insertOne(user);
            return users_query_repository_1.usersQueryRepository.mapToOutput(user);
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return false;
            }
            const user = yield db_1.usersCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (user.deletedCount === 0)
                return false;
            return true;
        });
    },
};
