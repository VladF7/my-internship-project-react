const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const defaultState = {
  currentUser: {},
  isAuth: false
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false
      }
    default:
      return state
  }
}

export const actionLogin = (user) => ({ type: LOGIN, payload: user })
export const actionLogout = () => ({ type: LOGOUT })
