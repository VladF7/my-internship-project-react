import { useEffect, useState } from 'react'
import './LoginPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { googleLoginThunk, loginThunk } from '../../store/auth/thunk'
import LoginForm from '../../components/ReactHookForms/Login/LoginForm'
import { PulseLoader } from 'react-spinners'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin'

const LoginPage = () => {
  const [submitError, setSubmitError] = useState('')

  const { inProcess, inProcessGoogleLogin } = useSelector((state) => state.auth)
  useEffect(() => {}, [])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

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
    const successLogin = await dispatch(loginThunk(formData))
    if (isFulfilled(successLogin)) {
      if (successLogin.payload.redirect) {
        navigate(`/${redirectPath[successLogin.payload.redirectTo]}`)
      } else {
        navigate(`/${loginPath[successLogin.payload.role]}`, { replace: true })
      }
    } else if (isRejected(successLogin)) {
      setSubmitError(Date.now)
    }
  }

  const googleLogin = async (accessToken) => {
    const successLogin = await dispatch(googleLoginThunk(accessToken))
    if (isFulfilled(successLogin)) {
      if (successLogin.payload.redirect) {
        navigate(`/${redirectPath[successLogin.payload.redirectTo]}`)
      } else {
        navigate(`/${loginPath[successLogin.payload.role]}`, { replace: true })
      }
    } else if (isRejected(successLogin)) {
      addToast('Something went wrong', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }

  return (
    <div className='loginPage'>
      <LoginForm
        onSubmit={onSubmit}
        submitError={submitError}
        inProcess={inProcess}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
      />
      <GoogleLogin
        inProcess={inProcessGoogleLogin}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
        onLogin={googleLogin}
        label={'Continue with google'}
      />
    </div>
  )
}

export default LoginPage
