import { useNavigate } from 'react-router-dom'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import MyInputItem from '../../../components/InputItem/MyInputItem'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { login } from '../../../services/auth'
import MyLabel from '../../../components/Label/MyLabel'

const UserAuthorization = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const currentUserName = useSelector((state) => state.auth.currentUser.name)
  const name = JSON.parse(sessionStorage.getItem('name'))

  const [email, setEmail] = useState(JSON.parse(sessionStorage.getItem('email')) || '')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailOrPasswordError, setEmailOrPasswordError] = useState('')
  const requiredField = 'Required field'

  const textError = 'Wrong email or password'
  const resetError = (setError) => {
    setError('')
    setEmailOrPasswordError('')
  }

  const onBlurEmail = (e) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!re.test(String(e).toLowerCase())) {
      setEmailError('Incorrect email')
      if (!e) {
        setEmailError('')
      }
    } else {
      setEmailError('')
    }
  }
  const skipAuthorization = (e) => {
    e.preventDefault()
    if (name !== currentUserName) {
      navigate(`/user/changeName`, { replace: true })
    } else {
      navigate(`/user/chooseMaster`, { replace: true })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      if (!email) {
        setEmailError(requiredField)
      }
      if (!password) {
        setPasswordError(requiredField)
      }
      return
    }
    if (emailError || passwordError || emailOrPasswordError) {
      return
    }

    dispatch(login(e)).then((res) => {
      if (!res) {
        setEmailOrPasswordError(textError)
        return
      } else {
        if (name !== currentUserName) {
          navigate(`/user/changeName`, { replace: true })
        } else {
          navigate(`/user/chooseMaster`, { replace: true })
        }
      }
    })
  }
  return (
    <div className='userPage'>
      <form className='userForm' onSubmit={(e) => onSubmit(e)}>
        <div>
          <MyLabel style={{ marginBottom: '10px' }}>
            You already have an account, would you like to log in?
          </MyLabel>
          <MyInputItem
            name='email'
            value={email}
            error={emailError || emailOrPasswordError}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => resetError(setEmailError)}
            onBlur={(e) => onBlurEmail(e.target.value)}
            item={{
              id: 'email',
              type: 'text',
              placeholder: 'Enter your email',
              discription: 'Enter email'
            }}
          />
          <MyInputItem
            name='password'
            value={password}
            error={passwordError || emailOrPasswordError}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => resetError(setPasswordError)}
            item={{
              id: 'password',
              type: 'password',
              placeholder: 'Enter your password',
              discription: 'Enter password'
            }}
          />
        </div>

        <div className='buttonBoxWrapper'>
          <div className='buttonBox'>
            <MyBigButton onClick={(e) => skipAuthorization(e)} className='backBigButton'>
              Skip
            </MyBigButton>
          </div>
          <div className='buttonBox'>
            <MyBigButton>Next</MyBigButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UserAuthorization
