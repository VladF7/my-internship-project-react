import { actionLogout } from '../../store/auth/slice'
import NavBar from '../NavBar/NavBar'
import './Header.css'
import logo from '../../logo/clock_logo.png'
import { Logo } from '../Logo/Logo'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import React, { useEffect, useState } from 'react'

const Header: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const { email, name, role } = useAppSelector((state) => state.auth.currentUser)
  const regexp = /([^\s]+)@([^\s.]+\.[a-z]+)/
  const [currentNameInHeader, setCurrentNameInHeader] = useState('')

  useEffect(() => {
    const matchResult = email && email.match(regexp)
    setCurrentNameInHeader(name || (matchResult && matchResult[1]) || '')
  }, [email, name, role])

  const dispatch = useAppDispatch()

  const logout = () => {
    const isLogout = window.confirm('Are you sure you want to log out of your account?')
    if (isLogout) {
      dispatch(actionLogout())
    }
  }

  const items = !isAuth
    ? [
        { name: 'Create order', path: '/' },
        { name: 'Log in', path: '/login' },
        { name: 'Sign up', path: '/registration' }
      ]
    : ([
        role === 'Master' ? '' : { name: 'Create order', path: '/' },
        { name: `${currentNameInHeader}`, path: `/${role?.toLowerCase()}` }
      ] as { name: string; path: string }[])

  return (
    <div className={'header'}>
      <div>
        <Logo
          src={logo}
          alt={'Logo'}
          width={'70px'}
          height={'60px'}
          color={'lightsalmon'}
          dropShadow
        />
      </div>
      <div className={'title'}>Clockwise Clockware</div>
      <div className='linksWrapper'>
        <NavBar items={items} />
        {isAuth && (
          <div className='link' onClick={() => logout()}>
            Log out
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
