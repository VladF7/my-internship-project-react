import { createSlice } from '@reduxjs/toolkit'
import { createUserCustomerThunk, googleLoginThunk, loginThunk, signUpThunk } from './thunk'

const initialState = {
  currentUser: {},
  isAuth: false,
  inProcess: false,
  inProcessGoogleLogin: false,
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
    builder.addCase(createUserCustomerThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(createUserCustomerThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(createUserCustomerThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload.message
    })
    builder.addCase(googleLoginThunk.pending, (state) => {
      state.inProcessGoogleLogin = true
      state.error = null
    })
    builder.addCase(googleLoginThunk.fulfilled, (state) => {
      state.inProcessGoogleLogin = false
    })
    builder.addCase(googleLoginThunk.rejected, (state, action) => {
      state.inProcessGoogleLogin = false
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
