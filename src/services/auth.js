import authAPI from '../api/authAPI'
import { actionLogin } from '../reducers/authReducer'
import { actionLoaded } from '../reducers/loadReducer'

export const login = (authForm) => {
  return async (dispatch) => {
    try {
      const res = await authAPI.login(authForm)
      if (!res.message) {
        dispatch(actionLogin(res.user))
        localStorage.setItem('token', res.token)
      } else {
        return res.message
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const res = await authAPI.auth()
      if (!res.message) {
        dispatch(actionLogin(res.user))
        localStorage.setItem('token', res.token)
      } else {
        return res.message
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      dispatch(actionLoaded())
    }
  }
}
