import { useDispatch, useSelector } from 'react-redux'
import { ClockLoader } from 'react-spinners'
import { actionLogout } from '../../reducers/authReducer'
import NavBar from '../NavBar/NavBar'
import './Header.css'

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const currentUserEmail = useSelector((state) => state.auth.currentUser.email)
  const role = useSelector((state) => state.auth.currentUser.role)
  const regexp = /([^\s]+)@([^\s.]+\.[a-z]+)/
  const currentUserName = currentUserEmail ? currentUserEmail.match(regexp)[1] : ''

  const dispatch = useDispatch()
  const logout = () => {
    const isLogout = window.confirm('Are you sure you want to log out of your account?')
    if (isLogout) {
      dispatch(actionLogout())
    }
  }

  const items =
    (!isAuth && [
      { name: 'Create order', path: '/' },
      { name: 'Log in', path: '/auth' },
      { name: 'Sign up', path: '/registration' }
    ]) ||
    (isAuth && [
      { name: 'Create order', path: '/' },
      { name: `${currentUserName}`, path: `/${role.toLowerCase()}` }
    ])

  return (
    <div className={'header'}>
      <div>
        <ClockLoader size='50px' color='lightsalmon' speedMultiplier='0.2' />
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
