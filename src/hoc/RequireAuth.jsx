import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { actionLogout } from '../store/auth/slice'

const RequireAuth = ({ page, role }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { isAuth } = useSelector((state) => state.auth)
  const userRole = useSelector((state) => state.auth.currentUser.role)
  const token = localStorage.getItem('token')

  const decode = token ? JSON.parse(atob(token.split('.')[1])) : ''
  if (decode.exp * 1000 < new Date().getTime()) {
    dispatch(actionLogout())
  }

  if (isAuth && userRole === role && token) {
    return page
  } else {
    return <Navigate to={`/`} state={{ from: location }}></Navigate>
  }
}

export default RequireAuth
