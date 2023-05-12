import { createSlice } from '@reduxjs/toolkit'
import { loginThunk, signUpThunk } from './thunk'

const initialState = {
  currentUser: {},
  isAuth: false,
  inProcess: false,
  error: null
}

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload.message
    })
    builder.addCase(signUpThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(signUpThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload.message
    })
  },
  reducers: {
    actionLogin(state, action) {
      state.currentUser = action.payload
      state.isAuth = true
    },
    actionLogout(state) {
      localStorage.removeItem('token')
      state.currentUser = {}
      state.isAuth = false
    }
  }
})

export const { actionLogin, actionLogout } = loginSlice.actions
export default loginSlice.reducer
