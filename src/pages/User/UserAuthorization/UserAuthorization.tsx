import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'
import LoginForm from '../../../components/ReactHookForms/Login/LoginForm'
import { loginThunk } from '../../../store/auth/thunk'
import { PulseLoader } from 'react-spinners'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import React from 'react'
import { ILoginForm } from '../../../types/user.types'

const UserAuthorization: FC = () => {
  const [submitError, setSubmitError] = useState(0)

  const dispatch = useAppDispatch()
  const { name: currentUserName } = useAppSelector((state) => state.auth.currentUser)
  const { inProcess } = useAppSelector((state) => state.auth)
  const { name, email } = useAppSelector((state) => state.createOrder.data)

  const navigate = useNavigate()

  const onSubmit = async (formData: ILoginForm) => {
    const successLogin = await dispatch(loginThunk(formData))
    if (isFulfilled(successLogin)) {
      if (name !== currentUserName) {
        navigate(`/user/changeName`, { replace: true })
      } else {
        navigate(`/user/chooseMaster`, { replace: true })
      }
    } else if (isRejected(successLogin)) {
      setSubmitError(Date.now)
    }
  }
  return (
    <div className='userPage'>
      <LoginForm
        formFields={{ email, password: '' }}
        onSubmit={onSubmit}
        submitError={submitError}
        inProcess={inProcess}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
      />
    </div>
  )
}

export default UserAuthorization
