import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import LoginForm from '../../../components/ReactHookForms/Login/LoginForm'
import { loginThunk } from '../../../store/auth/thunk'
import { PulseLoader } from 'react-spinners'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'

const UserAuthorization = () => {
  const [submitError, setSubmitError] = useState('')

  const dispatch = useDispatch()
  const { name: currentUserName } = useSelector((state) => state.auth.currentUser)
  const { inProcess } = useSelector((state) => state.auth)
  const { name, email } = useSelector((state) => state.createOrder.data)

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
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
        formFields={{ email }}
        onSubmit={onSubmit}
        submitError={submitError}
        inProcess={inProcess}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
      />
    </div>
  )
}

export default UserAuthorization
