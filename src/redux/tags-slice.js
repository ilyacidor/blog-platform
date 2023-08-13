import { createSlice } from '@reduxjs/toolkit'

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tagsIds: [],
  },
  reducers: {
    increaseTagsIds(state) {
      state.tagsIds.push(state.tagsIds.length)
    },
    deleteTag(state, action) {
      const idx = action.payload
      let sliceTagsIds = state.tagsIds.slice(idx + 1)
      sliceTagsIds = sliceTagsIds.map((el) => el - 1)
      const newTagsIds = [...state.tagsIds.slice(0, idx), ...sliceTagsIds]
      state.tagsIds = newTagsIds
    },
    clearTags(state) {
      state.tagsIds = []
    },
    createTags(state, action) {
      console.log(action.payload)
      state.tagsIds = action.payload
    },
  },
})

export const { increaseTagsIds, deleteTag, clearTags, createTags } = tagsSlice.actions

export default tagsSlice.reducer
