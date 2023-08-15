import { FC, useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import SignUpForm from '../../components/ReactHookForms/SignUp/SignUpForm'
import { signUpThunk } from '../../store/auth/thunk'
import { PulseLoader } from 'react-spinners'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import React from 'react'
import { ISignUpForm } from '../../types/user.types'

const SignUpPage: FC = () => {
  const [submitError, setSubmitError] = useState(0)

  const { inProcess } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (formData: ISignUpForm) => {
    const successSignUp = await dispatch(signUpThunk(formData))
    if (isFulfilled(successSignUp)) {
      navigate('/user/successSignUp')
    } else if (isRejected(successSignUp)) {
      setSubmitError(Date.now)
    }
  }

  return (
    <div className='signUpPage'>
      <SignUpForm
        inProcess={inProcess}
        onSubmit={onSubmit}
        submitError={submitError}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
      />
    </div>
  )
}

export default SignUpPage
