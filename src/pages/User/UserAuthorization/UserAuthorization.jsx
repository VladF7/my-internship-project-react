import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { login } from '../../../services/auth'
import LoginForm from '../../../components/ReactHookForms/Login/LoginForm'

const UserAuthorization = () => {
  const [submitError, setSubmitError] = useState('')

  const dispatch = useDispatch()
  const currentUserName = useSelector((state) => state.auth.currentUser.name)

  const navigate = useNavigate()

  const name = JSON.parse(sessionStorage.getItem('name'))
  const email = JSON.parse(sessionStorage.getItem('email')) || ''

  const onSubmit = async (formData) => {
    const successLogin = await dispatch(login(formData))
    if (!successLogin) {
      setSubmitError(Date.now)
      return
    }
    if (name !== currentUserName) {
      navigate(`/user/changeName`, { replace: true })
    } else {
      navigate(`/user/chooseMaster`, { replace: true })
    }
  }
  return (
    <div className='userPage'>
      <LoginForm formFields={{ email }} onSubmit={onSubmit} submitError={submitError} />
    </div>
  )
}

export default UserAuthorization
