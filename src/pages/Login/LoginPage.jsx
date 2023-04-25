import { useState } from 'react'
import MyInputItem from '../../components/InputItem/MyInputItem'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../services/auth'
import MyBigButton from '../../components/Buttons/BigButton/MyBigButton'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
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
  const redirectPath = {
    awaitAprove: 'awaitAprove',
    confirmEmail: 'confirmEmail'
  }
  const loginPath = {
    Admin: 'admin',
    Customer: 'customer',
    Master: 'master'
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
  const onBlurPassword = (password) => {
    if (password.length < 3) {
      setPasswordError('Password must not be less than 3 characters')
    }
    if (password.length > 16) {
      setPasswordError('Password must be 16 or fewer characters long')
    }
    if (password.length === 0) {
      setPasswordError('')
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
      }
      if (res.redirect) {
        navigate(`/user/${redirectPath[res.redirectTo]}`)
        return
      } else {
        navigate(`/${loginPath[res.role]}`, { replace: true })
        return
      }
    })
  }
  return (
    <form className='loginPage' onSubmit={(e) => onSubmit(e)}>
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
        onBlur={(e) => onBlurPassword(e.target.value)}
        item={{
          id: 'password',
          type: 'password',
          placeholder: 'Enter your password',
          discription: 'Enter password'
        }}
      />
      <div className='myButtonWrapper'>
        <MyBigButton>Log in</MyBigButton>
      </div>
    </form>
  )
}

export default LoginPage
