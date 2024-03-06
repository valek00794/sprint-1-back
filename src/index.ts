import express from 'express'

import { SETTINGS } from './settings'

import { runDb } from './db/db'
import { clearDbController } from './controllers/clearDbController'
import { videosRouter } from './routers/videos-router'
import { postsRouter } from './routers/posts-router'
import { blogsRouter } from './routers/blogs-router'


const app = express()
app.use(express.json())

app.use(SETTINGS.PATH.videos, videosRouter)
app.use(SETTINGS.PATH.posts, postsRouter)
app.use(SETTINGS.PATH.blogs, blogsRouter)

app.delete(SETTINGS.PATH.clearDb, clearDbController)


const startApp = async () => {
  await runDb()
  app.listen(SETTINGS.PORT, () => {
    console.log(`Example app listening on port ${SETTINGS.PORT}`)
  })
}

startApp()