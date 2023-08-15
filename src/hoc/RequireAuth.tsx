import { Navigate, useLocation } from 'react-router-dom'
import { actionLogout } from '../store/auth/slice'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'

enum Roles {
  Admin = 'Admin',
  Master = 'Master',
  Customer = 'Customer'
}

interface RequireAuthProps {
  page: React.ReactNode
  role: keyof typeof Roles
}

const RequireAuth: React.FC<RequireAuthProps> = ({ page, role }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { isAuth } = useAppSelector((state) => state.auth)
  const userRole = useAppSelector((state) => state.auth.currentUser.role)
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
