import { useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import SignUpForm from '../../components/ReactHookForms/SignUp/SignUpForm'
import { useDispatch, useSelector } from 'react-redux'
import { signUpThunk } from '../../store/auth/thunk'
import { PulseLoader } from 'react-spinners'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'

const SignUpPage = () => {
  const [submitError, setSubmitError] = useState('')

  const { inProcess } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (formData) => {
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
