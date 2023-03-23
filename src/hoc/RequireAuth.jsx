import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const isAuth = useSelector((state) => state.auth.isAuth)

  if (!isAuth) {
    return <Navigate to='/auth' state={{ from: location }}></Navigate>
  }

  return children
}

export default RequireAuth
