import { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../services/auth'
import LoginForm from '../../components/ReactHookForms/Login/LoginForm'

const LoginPage = () => {
  const [submitError, setSubmitError] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const redirectPath = {
    awaitApprove: 'master/awaitApprove',
    confirmEmail: 'user/confirmEmail'
  }
  const loginPath = {
    Admin: 'admin',
    Customer: 'customer',
    Master: 'master'
  }

  const onSubmit = async (formData) => {
    const successLogin = await dispatch(login(formData))
    if (!successLogin) {
      setSubmitError(Date.now)
      return
    }
    if (successLogin.redirect) {
      navigate(`/${redirectPath[successLogin.redirectTo]}`)
      return
    } else {
      navigate(`/${loginPath[successLogin.role]}`, { replace: true })
      return
    }
  }
  return (
    <div className='loginPage'>
      <LoginForm onSubmit={onSubmit} submitError={submitError} />
    </div>
  )
}

export default LoginPage
