"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const videosControllers_1 = require("../controllers/videosControllers");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', videosControllers_1.getVideosController);
exports.videosRouter.get('/:id', videosControllers_1.findVideoController);
exports.videosRouter.post('/', videosControllers_1.createVideoController);
exports.videosRouter.put('/:id', videosControllers_1.updateVideoController);
exports.videosRouter.delete('/:id', videosControllers_1.deleteVideoController);
