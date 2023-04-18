import { useState } from 'react'
import MyInputItem from '../../components/InputItem/MyInputItem'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import MyBigButton from '../../components/Buttons/BigButton/MyBigButton'
import MyLabel from '../../components/Label/MyLabel'
import CitiesSelect from '../../components/React-select/React-select'
import citiesAPI from '../../api/citiesAPI'
import userAPI from '../../api/userAPI'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmRules, setConfirmRules] = useState('')
  const [signUpAsMaster, setSignUpAsMaster] = useState(false)
  const [formHeigth, setFormHeigth] = useState('')
  const [cities, setCities] = useState([])

  const [citiesError, setCitiesError] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [registrationError, setRegistrationError] = useState('')

  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = await cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options
  }
  const requiredField = 'Required field'

  const resetError = (setError) => {
    setError('')
    setRegistrationError('')
  }

  const onBlurName = (name) => {
    if (name.length < 3) {
      setNameError('Name must not be less than 3 characters')
      if (name.length === 0) {
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
    }
    if (password.length > 16) {
      setPasswordError('Password must be 16 or fewer characters long')
    }
    if (password.length === 0) {
      setPasswordError('')
    }
  }
  const checkMasterSignUp = (checked) => {
    if (checked) {
      setSignUpAsMaster(true)
      setFormHeigth('475px')
    } else {
      setSignUpAsMaster(false)
      setFormHeigth('')
      setCitiesError('')
      setCities('')
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    if (nameError || emailError || passwordError || registrationError || citiesError) {
      return
    }
    if (!name || !email || !password) {
      if (!name) {
        setEmailError(requiredField)
      }
      if (!email) {
        setEmailError(requiredField)
      }
      if (!password) {
        setPasswordError(requiredField)
      }
      return
    }

    if (signUpAsMaster) {
      if (!cities.length) {
        setCitiesError(requiredField)
        return
      }
      const citiesId = cities.map((city) => city.value)
      const successMasterRegistration = await userAPI.masterRegistration(
        name,
        email,
        password,
        citiesId
      )
      if (!successMasterRegistration) {
        setRegistrationError('User with this email is alredy exist')
      } else {
        navigate('/successSignUp')
      }
    } else {
      const successCustomerRegistration = await userAPI.customerRegistration(name, email, password)
      if (!successCustomerRegistration) {
        setRegistrationError('User with this email is alredy exist')
      } else {
        navigate('/successSignUp')
      }
    }
  }

  return (
    <form className={'signUpPage'} style={{ height: formHeigth }} onSubmit={(e) => onSubmit(e)}>
      <MyInputItem
        name='name'
        value={name}
        error={nameError}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => onBlurName(e.target.value)}
        onFocus={() => setNameError('')}
        item={{
          id: 'name',
          type: 'text',
          placeholder: 'Must not be less than 3 characters',
          discription: 'Enter your name'
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
      <div style={{ display: signUpAsMaster ? '' : 'none' }}>
        <CitiesSelect
          value={cities}
          error={citiesError}
          name='cities'
          loadOptions={loadOptions}
          onChange={(e) => setCities(e)}
          onFocus={() => setCitiesError('')}
        />
      </div>

      <div style={{ display: 'flex' }}>
        <MyLabel htmlFor='rules'>I have read and agree to all rules </MyLabel>
        <input
          style={{ marginLeft: '8px' }}
          id='rules'
          name='rules'
          type='checkbox'
          value='checked'
          onChange={(e) => (e.target.checked ? setConfirmRules(true) : setConfirmRules(false))}
        ></input>
      </div>
      <div style={{ display: 'flex' }}>
        <MyLabel htmlFor='rules'>Sign up as master </MyLabel>
        <input
          style={{ marginLeft: '8px' }}
          id='rules'
          name='rules'
          type='checkbox'
          value='checked'
          onChange={(e) => checkMasterSignUp(e.target.checked)}
        ></input>
      </div>

      <div className='myButtonWrapper'>
        <MyBigButton disabled={confirmRules ? false : true}>Sign up</MyBigButton>
      </div>
    </form>
  )
}

export default SignUpPage
