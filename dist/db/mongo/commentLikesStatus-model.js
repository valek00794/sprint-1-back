"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesStatusModel = exports.LikesStatusSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const settings_1 = require("../../settings");
exports.LikesStatusSchema = new mongoose_1.default.Schema({
    parrentId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    parrentName: { type: String, required: true },
    likesUsersIds: { type: [String], required: true },
    dislikesUsersIds: { type: [String], required: true },
});
exports.LikesStatusModel = mongoose_1.default.model(settings_1.SETTINGS.DB.collection.LIKE_STATUS, exports.LikesStatusSchema);
