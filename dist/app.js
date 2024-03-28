"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./routers/videos-router");
const posts_router_1 = require("./routers/posts-router");
const blogs_router_1 = require("./routers/blogs-router");
const clearLocalDbController_1 = require("./controllers/clearLocalDbController");
const clearDbController_1 = require("./controllers/clearDbController");
const settings_1 = require("./settings");
const users_router_1 = require("./routers/users-router");
const auth_router_1 = require("./routers/auth-router");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(settings_1.SETTINGS.PATH.videos, videos_router_1.videosRouter);
exports.app.use(settings_1.SETTINGS.PATH.posts, posts_router_1.postsRouter);
exports.app.use(settings_1.SETTINGS.PATH.blogs, blogs_router_1.blogsRouter);
exports.app.use(settings_1.SETTINGS.PATH.users, users_router_1.usersRouter);
exports.app.use(settings_1.SETTINGS.PATH.login, auth_router_1.authRouter);
exports.app.delete(settings_1.SETTINGS.PATH.clearDb, clearDbController_1.clearDbController);
exports.app.delete(settings_1.SETTINGS.PATH.clearLocalDb, clearLocalDbController_1.clearLocalDbController);
