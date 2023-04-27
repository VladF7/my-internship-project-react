import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userAPI from '../../../../api/userAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import MyInputItem from '../../../../components/InputItem/MyInputItem'
import customersAPI from '../../../../api/customersAPI'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import { passwordMatchCheck } from '../../../../helpers'

const AddCustomer = () => {
  const prevPage = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verificationPassword, setVerificationPassword] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [verificationPasswordError, setVerificationPasswordError] = useState('')
  const [registrationError, setRegistrationError] = useState('')
  const requiredField = 'Required field'

  const resetError = (setError) => {
    setError('')
    setRegistrationError('')
  }
  const onBlurName = (e) => {
    if (e.target.value.length < 3) {
      setNameError('Name must not be less than 3 characters')
      if (e.target.value.length === 0) {
        setNameError('')
      }
    } else {
      setNameError('')
    }
  }
  const onBlurEmail = (email) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!re.test(String(email).toLowerCase())) {
      setEmailError('Incorrect email')
      if (!email) {
        setEmailError('')
      }
    } else {
      setEmailError('')
    }
  }

  const onBlurPassword = (password) => {
    if (password.length < 3) {
      setPasswordError('Password must not be less than 3 characters')
      return
    }
    if (password.length > 16) {
      setPasswordError('Password must be 16 or fewer characters long')
      return
    }
    if (password.length === 0) {
      setPasswordError('')
      return
    }
    passwordMatchCheck(
      verificationPassword,
      password,
      setVerificationPasswordError,
      'Passwords must match'
    )
  }
  const onBlurVerificationPassword = (verificationPassword) => {
    passwordMatchCheck(
      verificationPassword,
      password,
      setVerificationPasswordError,
      'Passwords must match'
    )
  }

  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }

  const addCustomer = async (e) => {
    e.preventDefault()
    if (
      nameError ||
      emailError ||
      passwordError ||
      registrationError ||
      verificationPasswordError
    ) {
      return
    }
    if (!name || !email || !password) {
      if (!name) {
        setNameError(requiredField)
      }
      if (!password) {
        setPasswordError(requiredField)
      }
      if (!email) {
        setEmailError(requiredField)
      }
      return
    }

    const successCustomerRegistration = await userAPI.customerRegistrationFromAdminPage(
      name,
      email,
      password
    )
    if (successCustomerRegistration) {
      await customersAPI.getCustomers()
      prevPage(-1)
    }
    setRegistrationError('User with this email is alredy exist')
  }
  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <form onSubmit={(e) => addCustomer(e)} className={'form'}>
          <MyInputItem
            name='name'
            value={name}
            error={nameError}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => onBlurName(e)}
            onFocus={() => resetError(setNameError)}
            item={{
              id: 'name',
              type: 'text',
              placeholder: 'Must not be less than 3 characters',
              discription: 'Enter customer name'
            }}
          />
          <MyInputItem
            name='email'
            value={email}
            error={emailError || registrationError}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => resetError(setEmailError)}
            onBlur={(e) => onBlurEmail(e.target.value)}
            item={{
              id: 'email',
              type: 'text',
              placeholder: 'Enter your email',
              discription: 'Enter email'
            }}
          />
          <MyInputItem
            name='password'
            value={password}
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => resetError(setPasswordError)}
            onBlur={(e) => onBlurPassword(e.target.value)}
            item={{
              id: 'password',
              type: 'password',
              placeholder: 'Enter your password',
              discription: 'Enter password'
            }}
          />
          <MyInputItem
            name='confirmPassword'
            value={verificationPassword}
            error={verificationPasswordError}
            onChange={(e) => setVerificationPassword(e.target.value)}
            onFocus={() => resetError(setVerificationPasswordError)}
            onBlur={(e) => onBlurVerificationPassword(e.target.value)}
            item={{
              id: 'confirmPassword',
              type: 'password',
              placeholder: 'Confirm password',
              discription: 'Confirm password'
            }}
          />
          <div className='myButtonWrapper'>
            <MyBigButton>Add customer</MyBigButton>
          </div>
          <div className='myButtonWrapper'>
            <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
              Cancel
            </MyBigButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCustomer
