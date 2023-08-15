import React, { useState } from 'react'
import './LoginPage.css'
import { googleLoginThunk, loginThunk } from '../../store/auth/thunk'
import LoginForm from '../../components/ReactHookForms/Login/LoginForm'
import { PulseLoader } from 'react-spinners'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ILoginForm } from '../../types/user.types'

interface RedirectPaths {
  [key: string]: string
}

const LoginPage: React.FC = () => {
  const [submitError, setSubmitError] = useState(0)

  const { inProcess, inProcessGoogleLogin } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const redirectPath: RedirectPaths = {
    awaitApprove: 'master/awaitApprove',
    confirmEmail: 'user/confirmEmail'
  }
  const loginPath: RedirectPaths = {
    Admin: 'admin',
    Customer: 'customer',
    Master: 'master'
  }

  const onSubmit = async (formData: ILoginForm) => {
    const successLogin = await dispatch(loginThunk(formData))
    if (isFulfilled(successLogin)) {
      if ('redirect' in successLogin.payload) {
        const redirectTo = successLogin.payload.redirectTo as string
        navigate(`/${redirectPath[redirectTo]}`)
      } else if ('role' in successLogin.payload) {
        const role = successLogin.payload.role as string
        navigate(`/${loginPath[role]}`, { replace: true })
      }
    } else if (isRejected(successLogin)) {
      setSubmitError(Date.now)
    }
  }

  const googleLogin = async (accessToken: string) => {
    const successLogin = await dispatch(googleLoginThunk(accessToken))
    if (isFulfilled(successLogin)) {
      if ('redirect' in successLogin.payload) {
        const redirectTo = successLogin.payload.redirectTo as string
        navigate(`/${redirectPath[redirectTo]}`)
      } else if ('role' in successLogin.payload) {
        const role = successLogin.payload.role as string
        navigate(`/${loginPath[role]}`, { replace: true })
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
        formFields={undefined}
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
