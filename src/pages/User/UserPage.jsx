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
import { formatValueToDecimal } from '../../helpers'

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
  const [clockError, setClockError] = useState('')
  const [cityError, setCityError] = useState('')
  const [dateError, setDateError] = useState('')

  const clocksOptions = clocks.map((clock) => {
    return { id: clock.id, name: clock.size }
  })
  const navigate = useNavigate()
  const requiredField = 'Required field'
  const currency = 'USD'

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

  const getSubmit = async (e) => {
    e.preventDefault()
    if (nameError || emailError || clockError || cityError || dateError) {
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
        setClockError(requiredField)
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
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => onBlurEmail(e.target.value)}
          onFocus={() => setEmailError('')}
          item={{
            id: 'mail',
            type: 'mail',
            placeholder: 'example@example.com',
            discription: 'Enter your email'
          }}
        />
        <DatePicker
          name='date'
          value={date}
          error={dateError}
          onFocus={() => setDateError('')}
          onChange={(date) => setDate(date)}
        />
        <MySelectWithLabel
          name='clock'
          value={clock}
          options={clocksOptions}
          placeholder={'Click to select clock size'}
          discription={'Choose clock size'}
          error={clockError}
          onFocus={() => setClockError('')}
          onChange={(e) => setClock(Number(e.target.value))}
        />
        <MySelectWithLabel
          name='city'
          value={city}
          options={cities}
          placeholder={'Click to select city'}
          discription={'Choose your city'}
          error={cityError}
          onFocus={() => setCityError('')}
          onChange={(e) => setCity(Number(e.target.value))}
        />
        <MyLabel
          style={{
            visibility: price ? '' : 'hidden',
            paddingLeft: '0px',
            justifyContent: 'center'
          }}
        >
          Clock repair will cost {formatValueToDecimal(price)} {currency}
        </MyLabel>
        <div className='myButtonWrapper'>
          <MyBigButton>Next</MyBigButton>
        </div>
      </form>
    </div>
  )
}

export default UserForm
