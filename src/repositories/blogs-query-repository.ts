import { ObjectId } from 'mongodb'

import { BlogDbType, BlogViewType, PaginatorBlogViewType } from '../types/blogs-types'
import { getSanitizationQuery } from '../utils'
import { SearchQueryParametersType } from '../types/query-types'
import { BlogsModel } from '../db/mongo/blogs.model'

export const blogsQueryRepository = {
    async getBlogs(query?: SearchQueryParametersType): Promise<PaginatorBlogViewType> {
        const sanitizationQuery = getSanitizationQuery(query)
        const findOptions = sanitizationQuery.searchNameTerm !== null ? { name: { $regex: sanitizationQuery.searchNameTerm, $options: 'i' } } : {}

        const blogs = await BlogsModel
            .find(findOptions)
            .sort({ [sanitizationQuery.sortBy]: sanitizationQuery.sortDirection })
            .skip((sanitizationQuery.pageNumber - 1) * sanitizationQuery.pageSize)
            .limit(sanitizationQuery.pageSize)

        const blogsCount = await BlogsModel.countDocuments(findOptions)

        return {
            pagesCount: Math.ceil(blogsCount / sanitizationQuery.pageSize),
            page: sanitizationQuery.pageNumber,
            pageSize: sanitizationQuery.pageSize,
            totalCount: blogsCount,
            items: blogs.map(blog => this.mapToOutput(blog))
        }
    },

    async findBlog(id: string): Promise<null | BlogViewType> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        const blog = await BlogsModel.findById(id)
        return blog ? this.mapToOutput(blog) : null
    },

    mapToOutput(blog: BlogDbType): BlogViewType {
        return {
            id: blog._id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        }
    },
}