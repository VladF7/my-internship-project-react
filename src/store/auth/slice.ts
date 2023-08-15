import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createUserCustomerThunk, googleLoginThunk, loginThunk, signUpThunk } from './thunk'
import { IUser } from '../../types/user.types'

interface AuthState {
  currentUser: IUser
  isAuth: boolean
  inProcess: boolean
  inProcessGoogleLogin: boolean
  error: string | null
}

const initialState: AuthState = {
  currentUser: {
    id: '',
    role: '',
    email: '',
    customerId: '',
    masterId: '',
    isEmailActivated: ''
  },
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
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
    })
  },
  reducers: {
    actionLogin(state, action: PayloadAction<IUser>) {
      state.currentUser = action.payload
      state.isAuth = true
    },
    actionLogout(state) {
      localStorage.removeItem('token')
      state.currentUser = {
        id: '',
        role: '',
        email: '',
        customerId: '',
        masterId: '',
        isEmailActivated: ''
      }
      state.isAuth = false
    }
  }
})

export const { actionLogin, actionLogout } = loginSlice.actions
export default loginSlice.reducer
