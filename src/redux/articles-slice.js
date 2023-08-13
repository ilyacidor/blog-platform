import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk('articles/fetcharticles', async function (offset) {
  const token = sessionStorage.getItem('token')
  const articles = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}&limit=5`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await articles.json()
})

export const fetchArticle = createAsyncThunk('articles/fetcharticle', async function (slug) {
  const token = sessionStorage.getItem('token')
  const article = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await article.json()
})

export const createArticle = createAsyncThunk('articles/createarticle', async function (article) {
  const data = JSON.stringify({ article })
  const token = sessionStorage.getItem('token')
  const res = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POSt',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return await res.json()
})

export const favoriteArticle = createAsyncThunk('articles/favoritearticle', async function (slug) {
  const token = sessionStorage.getItem('token')
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POSt',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await res.json()
})

export const unfavoriteArticle = createAsyncThunk('articles/unfavoritearticle', async function (slug) {
  const token = sessionStorage.getItem('token')
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await res.json()
})

export const updateArticle = createAsyncThunk('articles/updatearticle', async function (article) {
  const data = JSON.stringify({ article })
  console.log(data)
  const token = sessionStorage.getItem('token')
  const slug = sessionStorage.getItem('slug')
  console.log(slug)
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return await res.json()
})

export const deleteArticle = createAsyncThunk('articles/deletearticle', async function (slug) {
  const token = sessionStorage.getItem('token')
  const article = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await article.json()
})

let maxId = 1

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    currentArticle: {
      author: {
        following: false,
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        username: 'Not Exist',
      },
      body: 'This article does not exist',
      createdAt: '0000-01-01T12:00:00.000Z',
      description: 'Not exist arcticle',
      favorited: false,
      favoritesCount: 0,
      id: 1,
      slug: 'cfvrgebht-stcocb',
      tagList: ['Not Exist'],
      title: 'Not Exist Article',
    },
    page: 1,
    articlesCount: 1,
    status: null,
    error: null,
  },
  reducers: {
    updatePage(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolve'
      state.articles = action.payload.articles.map((el) => ({ ...el, id: maxId++ }))
      state.articlesCount = action.payload.articlesCount
    },
    [fetchArticles.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
    [fetchArticle.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.status = 'article resolve'
      state.currentArticle = action.payload.article
    },
    [fetchArticle.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
    [favoriteArticle.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [favoriteArticle.fulfilled]: (state, action) => {
      state.status = 'article resolve'
      state.currentArticle = action.payload.article
    },
    [favoriteArticle.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
    [unfavoriteArticle.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [unfavoriteArticle.fulfilled]: (state, action) => {
      state.status = 'article resolve'
      state.currentArticle = action.payload.article
    },
    [unfavoriteArticle.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
  },
})

export const { updatePage } = articlesSlice.actions

export default articlesSlice.reducer
