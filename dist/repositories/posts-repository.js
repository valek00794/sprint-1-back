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
exports.postsRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const blogs_query_repository_1 = require("./blogs-query-repository");
const posts_query_repository_1 = require("./posts-query-repository");
exports.postsRepository = {
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return false;
            }
            const post = yield db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (post.deletedCount === 0) {
                return false;
            }
            return true;
        });
    },
    createPost(body, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let getBlogId = blogId && mongodb_1.ObjectId.isValid(blogId) ? blogId : body.blogId;
            const newPost = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: new mongodb_1.ObjectId(getBlogId),
                blogName: '',
                createdAt: new Date().toISOString()
            };
            const blog = yield blogs_query_repository_1.blogsQueryRepository.findBlog(getBlogId);
            if (blog) {
                newPost.blogName = blog.name;
            }
            yield db_1.postsCollection.insertOne(newPost);
            return posts_query_repository_1.postsQueryRepository.mapToOutput(newPost); //обычный repo не должен мапить данные
        });
    },
    updatePost(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield posts_query_repository_1.postsQueryRepository.findPost(id);
            if (!post) {
                return false;
            }
            const updatedPost = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: new mongodb_1.ObjectId(body.blogId),
                blogName: '',
                createdAt: post.createdAt
            };
            const blog = yield blogs_query_repository_1.blogsQueryRepository.findBlog(body.blogId.toString());
            if (blog) {
                updatedPost.blogName = blog.name;
            }
            yield db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updatedPost });
            return true;
        });
    },
};
