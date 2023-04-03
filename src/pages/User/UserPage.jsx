import './UserPage.css'
import { useEffect, useState } from 'react'
import MyInputItem from '../../components/InputItem/MyInputItem'
import MySizeSelector from '../../components/SizeSelector/MySizeSelector'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../services/user'
import MyBigButton from '../../components/Buttons/BigButton/MyBigButton'
import citiesAPI from '../../api/citiesAPI'
import DatePicker from '../../components/DatePicker/DatePicker'
import { parse } from 'date-fns'
import MySelect from '../../components/Select/MySelect'

const UserForm = () => {
  const [cities, setCities] = useState([])
  const [email, setEmail] = useState(JSON.parse(sessionStorage.getItem('email')) || '')
  const [name, setName] = useState(JSON.parse(sessionStorage.getItem('name')) || '')
  const [size, setSize] = useState(JSON.parse(sessionStorage.getItem('clockId')) || '')
  const [city, setCity] = useState(JSON.parse(sessionStorage.getItem('cityId')) || '')
  const [date, setDate] = useState(
    sessionStorage.getItem('startTime')
      ? parse(JSON.parse(sessionStorage.getItem('startTime')), 'yyyy.MM.dd, HH:mm', new Date())
      : ''
  )

  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')
  const [sizeError, setSizeError] = useState('')
  const [cityError, setCityError] = useState('')
  const [dateError, setDateError] = useState('')

  useEffect(() => {
    citiesAPI
      .getCities()
      .then((cities) => setCities(cities))
      .then(() => sessionStorage.clear())
  }, [])

  const navigate = useNavigate()
  const requiredField = 'Поле обязательное для заполнения'
  const citiesOptionsList = cities.map((city) => {
    return { value: city.id, label: city.name }
  })

  const onBlurName = (name) => {
    if (name.length < 3) {
      setNameError('Имя не должно быть меньше 3 символов')
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
      setEmailError('Не корректный email')
      if (!email) {
        setEmailError('')
      }
    } else {
      setEmailError('')
    }
  }
  const changeSize = (size) => {
    setSizeError('')
    setSize(Number(size))
  }
  const changeCity = (city) => {
    setCityError('')
    setCity(Number(city))
  }
  const changeDate = (date) => {
    setDate(date)
    setDateError('')
  }
  const getSubmit = async (e) => {
    e.preventDefault()
    if (nameError || emailError || sizeError || cityError || dateError) {
      return
    }
    if (!name || !email || !size || !city || !date) {
      if (!name) {
        setNameError(requiredField)
      }
      if (!email) {
        setEmailError(requiredField)
      }
      if (!size) {
        setSizeError(requiredField)
      }
      if (!city) {
        setCityError(requiredField)
      }
      if (!date) {
        setDateError(requiredField)
      }
      return
    } else {
      const startTime = e.target.date.value
      await createUser(name, email, size, city, startTime)
      navigate('chooseMaster')
    }
  }
  return (
    <div className='userPage'>
      <form className={'userForm'} onSubmit={(e) => getSubmit(e)}>
        <MyInputItem
          name='name'
          value={name}
          error={nameError}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => onBlurName(e.target.value)}
          item={{
            id: 'name',
            type: 'text',
            placeholder: 'Не менее 3 символов',
            discription: 'Введите ваше имя'
          }}
        />
        <MyInputItem
          name='email'
          value={email}
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => onBlurEmail(e.target.value)}
          item={{
            id: 'mail',
            type: 'mail',
            placeholder: 'example@example.com',
            discription: 'Введите ваш email'
          }}
        />
        <MySizeSelector
          name='size'
          onChange={(e) => changeSize(e.target.value)}
          error={sizeError}
          value={size}
        />
        <MySelect
          name='city'
          value={city}
          options={citiesOptionsList}
          placeholder={'Кликните для выбора города'}
          discription={'Выберите ваш город'}
          error={cityError}
          onChange={(e) => changeCity(e.target.value)}
        />
        <DatePicker
          name='date'
          value={date}
          error={dateError}
          onChange={(date) => changeDate(date)}
        />
        <div className='myButtonWrapper'>
          <MyBigButton>Далее</MyBigButton>
        </div>
      </form>
    </div>
  )
}

export default UserForm
