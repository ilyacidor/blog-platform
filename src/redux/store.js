import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles-slice'
import userSlice from './user-slice'
import tagsSlice from './tags-slice'

export default configureStore({
  reducer: {
    articles: articlesSlice,
    user: userSlice,
    tagsIds: tagsSlice,
  },
})
