import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const registerUser = createAsyncThunk('user/registeruser', async function (user) {
  const data = JSON.stringify({ user })
  const res = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return await res.json()
})

export const getUser = createAsyncThunk('user/getuser', async function (user) {
  const data = JSON.stringify({ user })
  const res = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return await res.json()
})

export const updateUser = createAsyncThunk('user/updateuser', async function (user) {
  const data = JSON.stringify({ user })
  const token = sessionStorage.getItem('token')
  const res = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: data,
  })
  return await res.json()
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    status: null,
    error: null,
    method: null,
  },
  reducers: {
    logOut(state) {
      sessionStorage.clear()
      state.user = {}
      state.method = ''
    },
    clearError(state) {
      state.error = null
      state.method = null
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'resolve'
      let newObj = action.payload
      if (!newObj.errors) {
        state.user = { ...newObj.user, image: 'https://static.productionready.io/images/smiley-cyrus.jpg' }
        sessionStorage.setItem('username', state.user.username)
        sessionStorage.setItem('email', state.user.email)
        sessionStorage.setItem('token', state.user.token)
        sessionStorage.setItem('image', state.user.image)
      } else {
        state.error = newObj.errors
      }
      state.method = 'POST(sign-up)'
    },
    [registerUser.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
    [getUser.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = 'resolve'
      let newObj = action.payload
      if (!newObj.errors) {
        state.user = newObj.user.image
          ? newObj.user
          : { ...newObj.user, image: 'https://static.productionready.io/images/smiley-cyrus.jpg' }
        sessionStorage.setItem('username', state.user.username)
        sessionStorage.setItem('email', state.user.email)
        sessionStorage.setItem('token', state.user.token)
        sessionStorage.setItem('image', state.user.image)
      } else {
        state.error = newObj.errors
      }
      state.method = 'POST(sign-in)'
    },
    [getUser.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
    [updateUser.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'resolve'
      let newObj = action.payload
      if (!newObj.errors) {
        state.user = newObj.user
        sessionStorage.setItem('username', state.user.username)
        sessionStorage.setItem('email', state.user.email)
        sessionStorage.setItem('token', state.user.token)
        sessionStorage.setItem('image', state.user.image)
      } else {
        state.error = newObj.errors
      }
      state.method = 'PUT'
    },
    [updateUser.rejected]: (state) => {
      state.status = 'reject'
      state.error = 'error'
    },
  },
})

export const { logOut, clearError } = userSlice.actions

export default userSlice.reducer
