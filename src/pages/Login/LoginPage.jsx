import { useEffect, useState } from 'react'
import './LoginPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../../store/auth/thunk'
import LoginForm from '../../components/ReactHookForms/Login/LoginForm'
import { PulseLoader } from 'react-spinners'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [submitError, setSubmitError] = useState('')

  const { inProcess } = useSelector((state) => state.auth)
  useEffect(() => {}, [])

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

  return (
    <div className='loginPage'>
      <LoginForm
        onSubmit={onSubmit}
        submitError={submitError}
        inProcess={inProcess}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
      />
    </div>
  )
}

export default LoginPage
