import { actionLogin } from '../reducers/authReducer'
import { actionLoaded } from '../reducers/loadReducer'
import userAPI from '../api/userAPI'

export const login = (authForm) => {
  return async (dispatch) => {
    try {
      const res = await userAPI.login(authForm)
      if (res) {
        dispatch(actionLogin(res.user))
        localStorage.setItem('token', res.token)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const res = await userAPI.auth()
      if (res) {
        dispatch(actionLogin(res.user))
      } else {
        return res
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      dispatch(actionLoaded())
    }
  }
}
