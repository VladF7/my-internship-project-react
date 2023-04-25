import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ page, role }) => {
  const location = useLocation()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const userRole = useSelector((state) => state.auth.currentUser.role)
  const token = localStorage.getItem('token')

  if (isAuth && userRole === role && token) {
    return page
  } else {
    return <Navigate to={`/`} state={{ from: location }}></Navigate>
  }
}

export default RequireAuth
