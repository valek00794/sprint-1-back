import { ObjectId } from 'mongodb'

import { BlogDbType, BlogView } from '../types/blogs-types'
import { getSanitizationQuery } from '../utils'
import { SearchQueryParametersType } from '../types/query-types'
import { BlogsModel } from '../db/mongo/blogs.model'
import { Paginator } from '../types/result-types'

class BlogsQueryRepository {
    async getBlogs(query?: SearchQueryParametersType): Promise<Paginator<BlogView[]>> {
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
    }

    async findBlog(id: string): Promise<null | BlogView> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        const blog = await BlogsModel.findById(id)
        return blog ? this.mapToOutput(blog) : null
    }

    mapToOutput(blog: BlogDbType) {
        return new BlogView(blog._id,
            blog.name,
            blog.description,
            blog.websiteUrl,
            blog.createdAt,
            blog.isMembership,
        )
    }
}

export const blogsQueryRepository = new BlogsQueryRepository()