import { useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import userAPI from '../../api/userAPI'
import SignUpForm from '../../components/ReactHookForms/SignUp/SignUpForm'

const SignUpPage = () => {
  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    const successSignUp = formData.signUpAsMaster
      ? await userAPI.masterRegistration(formData)
      : await userAPI.customerRegistration(formData)

    if (!successSignUp) {
      setSubmitError(Date.now)
    } else {
      navigate('/user/successSignUp')
    }
  }

  return (
    <div className='signUpPage'>
      <SignUpForm onSubmit={onSubmit} submitError={submitError}></SignUpForm>
    </div>
  )
}

export default SignUpPage
