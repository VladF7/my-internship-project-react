import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import mastersAPI from '../../../../api/mastersAPI'
import userAPI from '../../../../api/userAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import MyInputItem from '../../../../components/InputItem/MyInputItem'
import CitiesSelect from '../../../../components/React-select/React-select'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'

const AddMaster = () => {
  const loadOptions = async () => {
    const cities = await citiesAPI.getCities()
    const options = await cities.map((city) => {
      return { value: city.id, label: city.name }
    })
    return options
  }
  const prevPage = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [cities, setCities] = useState([])

  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [registrationError, setRegistrationError] = useState('')
  const [citiesError, setCitiesError] = useState('')
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
    }
    if (password.length > 16) {
      setPasswordError('Password must be 16 or fewer characters long')
    }
    if (password.length === 0) {
      setPasswordError('')
    }
  }

  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }

  const addMaster = async (e) => {
    e.preventDefault()
    if (!name || !cities.length || !email || !password) {
      if (!name) {
        setNameError(requiredField)
      }
      if (!cities.length) {
        setCitiesError(requiredField)
      }
      if (!password) {
        setPasswordError(requiredField)
      }
      if (!email) {
        setEmailError(requiredField)
      }
      return
    }
    const citiesId = cities.map((city) => city.value)

    const successMasterRegistration = await userAPI.masterRegistrationFromAdminPage(
      name,
      email,
      password,
      citiesId
    )
    if (successMasterRegistration) {
      await mastersAPI.getMasters()
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
        <form onSubmit={(e) => addMaster(e)} className={'form'}>
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
              discription: 'Enter master name'
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
          <CitiesSelect
            value={cities}
            error={citiesError}
            name='cities'
            loadOptions={loadOptions}
            onChange={(e) => setCities(e)}
            onFocus={() => resetError(setCitiesError)}
          />
          <div className='myButtonWrapper'>
            <MyBigButton>Add master</MyBigButton>
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

export default AddMaster
