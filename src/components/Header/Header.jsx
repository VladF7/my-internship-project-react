import { useDispatch, useSelector } from 'react-redux'
import { ClockLoader } from 'react-spinners'
import { actionLogout } from '../../reducers/authReducer'
import NavBar from '../NavBar/NavBar'
import './Header.css'

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const regexp = /([^\s]+)@([^\s\.]+\.[a-z]+)/
  const currentUserName = currentUser.length > 0 ? currentUser.match(regexp)[1] : ''

  const dispatch = useDispatch()
  const logout = () => {
    const isLogout = window.confirm('Вы уверены, что желаете выйти из аккаунта?')
    if (isLogout) {
      dispatch(actionLogout())
    }
  }

  const items =
    (!isAuth && [
      { name: 'Вызвать мастера', path: '/' },
      { name: 'Войти', path: '/auth' }
    ]) ||
    (isAuth && [
      { name: 'Вызвать мастера', path: '/' },
      { name: `${currentUserName}`, path: '/admin' }
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
            Выйти
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
