import {app} from './app'

import { SETTINGS } from './settings'

import { runDb } from './db/db'

import { videosRouter } from './routers/videos-router'
import { postsRouter } from './routers/posts-router'
import { blogsRouter } from './routers/blogs-router'
import { clearLocalDbController } from './controllers/clearLocalDbController'
import { clearDbController } from './controllers/clearDbController'


app.use(SETTINGS.PATH.videos, videosRouter)
app.use(SETTINGS.PATH.posts, postsRouter)
app.use(SETTINGS.PATH.blogs, blogsRouter)

app.delete(SETTINGS.PATH.clearDb, clearDbController)
app.delete(SETTINGS.PATH.clearLocalDb, clearLocalDbController)


const startApp = async () => {
  await runDb()
  app.listen(SETTINGS.PORT, () => {
    console.log(`Example app listening on port ${SETTINGS.PORT}`)
  })
}

startApp()