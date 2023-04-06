/* eslint-disable no-unused-vars */
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
import MyLabel from '../../components/Label/MyLabel'
import clocksAPI from '../../api/clocksAPI'
import MySelectWithLabel from '../../components/Select/MySelectWithLabel'

const UserForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cities, setCities] = useState([])
  const [clocks, setClocks] = useState([])
  const [email, setEmail] = useState(JSON.parse(sessionStorage.getItem('email')) || '')
  const [name, setName] = useState(JSON.parse(sessionStorage.getItem('name')) || '')
  const [clock, setClock] = useState(JSON.parse(sessionStorage.getItem('clockId')) || '')
  const [city, setCity] = useState(JSON.parse(sessionStorage.getItem('cityId')) || '')
  const [priceForHour, setPriceForHour] = useState(
    JSON.parse(sessionStorage.getItem('priceForHour')) || ''
  )
  const [timeToFix, setTimeToFix] = useState(JSON.parse(sessionStorage.getItem('timeToFix')) || '')
  const [price, setPrice] = useState(JSON.parse(sessionStorage.getItem('price')) || '')
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
    Promise.all([clocksAPI.getClocks(), citiesAPI.getCities()])
      .then((result) => {
        const [clocks, cities] = result
        setClocks(clocks)
        setCities(cities)
      })

      .then(() => setIsLoading(false))
      .then(() => sessionStorage.clear())
  }, [])
  useEffect(() => {
    if (!isLoading) {
      getPriceForHour(city)
    }
  }, [city])
  useEffect(() => {
    if (!isLoading) {
      getTimeToFix(clock)
    }
  }, [clock])
  useEffect(() => {
    getPrice(timeToFix, priceForHour)
  }, [priceForHour, timeToFix])

  const navigate = useNavigate()
  const requiredField = 'Required field'
  const currency = 'USD'

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
  const getPrice = (timeToFix, priceForHour) => {
    const price = timeToFix * priceForHour
    setPrice(price)
  }
  const getPriceForHour = (cityId) => {
    const [city] = cities.filter((city) => city.id === cityId)
    if (city) {
      setPriceForHour(city.priceForHour)
    } else {
      setPriceForHour('')
    }
  }
  const getTimeToFix = (clockId) => {
    const [clock] = clocks.filter((clock) => clock.id === clockId)
    if (clock) {
      setTimeToFix(clock.timeToFix)
    } else {
      setPriceForHour('')
    }
  }
  const changeClock = (clockId) => {
    setSizeError('')
    setClock(Number(clockId))
  }
  const changeCity = (cityId) => {
    setCityError('')
    setCity(Number(cityId))
  }
  const changeDate = (date) => {
    setDateError('')
    setDate(date)
  }
  const getSubmit = async (e) => {
    e.preventDefault()
    if (nameError || emailError || sizeError || cityError || dateError) {
      return
    }
    if (!name || !email || !clock || !city || !date) {
      if (!name) {
        setNameError(requiredField)
      }
      if (!email) {
        setEmailError(requiredField)
      }
      if (!clock) {
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
      await createUser(name, email, clock, city, startTime, price, priceForHour, timeToFix)
      navigate('chooseMaster')
    }
  }

  if (isLoading) return <div className='userPage'></div>

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
            placeholder: 'Must not be less than 3 characters',
            discription: 'Enter your name'
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
            discription: 'Enter your email'
          }}
        />
        <MySizeSelector
          name='clock'
          labelText='Time to fix'
          labelValue={timeToFix}
          labelWord={timeToFix > 1 ? 'hours' : 'hour'}
          onChange={(e) => changeClock(e.target.value)}
          options={clocks}
          error={sizeError}
          value={clock}
        />
        <MySelectWithLabel
          name='city'
          value={city}
          options={cities}
          labelText='Price for hour'
          labelValue={priceForHour}
          labelWord={currency}
          placeholder={'Click to select city'}
          discription={'Choose your city'}
          error={cityError}
          onChange={(e) => changeCity(e.target.value)}
        />
        <DatePicker
          name='date'
          value={date}
          error={dateError}
          onChange={(date) => changeDate(date)}
        />
        <MyLabel
          style={{
            visibility: price ? '' : 'hidden'
          }}
        >
          Clock repair will cost {price} {currency}
        </MyLabel>
        <div className='myButtonWrapper'>
          <MyBigButton>Next</MyBigButton>
        </div>
      </form>
    </div>
  )
}

export default UserForm
