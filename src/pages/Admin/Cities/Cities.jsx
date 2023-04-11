import { useEffect, useState } from 'react'
import citiesAPI from '../../../api/citiesAPI'
import MyButton from '../../../components/Buttons/BigButton/MyBigButton'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import MyError from '../../../components/Error/MyError'
import MyInput from '../../../components/Input/MyInput'
import MyLabel from '../../../components/Label/MyLabel'
import './Cities.css'
import MySpan from '../../../components/Span/MySpan'

const Cities = () => {
  const [city, setCity] = useState('')
  const [priceForHour, setPriceForHour] = useState('')
  const [cities, setCities] = useState([])
  const [cityError, setCityError] = useState('')
  const [priceForHourError, setPriceForHourError] = useState('')
  const [cityId, setCityId] = useState('')
  const [error, setError] = useState('')
  const [cityDeleteError, setCityDeleteError] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const requiredField = 'Required field'
  const priceForHourField = 'Must be not empty and not null'
  const currency = 'USD'

  useEffect(() => {
    citiesAPI
      .getCities()
      .then((cities) => setCities(cities))
      .then(() => setIsLoading(false))
  }, [])

  const changePriceForHour = (event) => {
    let priceForHour = event.target.value
    priceForHour = priceForHour.replace(/,/g, '.')
    priceForHour = priceForHour.replace(/[^\d.]/g, '')

    if (parseFloat(priceForHour) < 0) {
      event.preventDefault()
      return
    }
    const dotIndex = priceForHour.indexOf('.')
    if (dotIndex !== -1 && priceForHour.indexOf('.', dotIndex + 1) !== -1) {
      event.preventDefault()
      return
    }
    const decimalIndex = priceForHour.indexOf('.')
    if (decimalIndex !== -1 && priceForHour.substring(decimalIndex + 1).length > 2) {
      event.preventDefault()
      return
    }
    setPriceForHour(priceForHour)
  }
  const formatValueToDecimal = (value) => {
    return (value / 100).toFixed(2)
  }
  const formatValueToInteger = (value) => {
    return value * 100
  }

  const addCity = async (e) => {
    e.preventDefault()
    setError('')
    const formattedPriceForHour = formatValueToInteger(priceForHour)

    if (!city || !priceForHour || formattedPriceForHour === 0) {
      if (!city) {
        setCityError(requiredField)
      }
      if (!priceForHour || formattedPriceForHour === 0) {
        setPriceForHourError(priceForHourField)
      }
      return
    }
    if (cityError || priceForHourError) {
      return
    }

    const newCity = await citiesAPI.addCity(city, formattedPriceForHour)
    if (newCity) {
      setCities([...cities, newCity])
      setCity('')
      setPriceForHour('')
    } else {
      setError('A city with that name alredy exist')
    }
  }

  const delCity = (id) => {
    citiesAPI.delCity(id).then((city) => {
      if (!city) {
        setCityDeleteError('Cannot be deleted, city is in use')
        setTimeout(() => {
          setCityDeleteError('')
        }, 1500)
      } else {
        setCities(cities.filter((city) => city.id !== id))
      }
    })
    setCityId(id)
  }

  if (isLoading) return <MySpan>The list of cities is loading...</MySpan>

  return (
    <div className={'itemContent'}>
      <div className='cities'>
        <ul className={'list'}>
          {!cities.length ? (
            <MySpan>The list of cities is empty</MySpan>
          ) : (
            cities.map((city) => {
              return (
                <li id={city.id} key={city.id} className={'listItem'}>
                  {cityId === city.id ? <MyError>{cityDeleteError}</MyError> : ''}
                  <div className='itemInfo'>
                    <MySpan>City: {city.name},</MySpan>
                    <MySpan>
                      Price for hour: {formatValueToDecimal(city.priceForHour)} {currency},
                    </MySpan>
                  </div>
                  <div className='buttons'>
                    <MySmallButton to={`${city.id}`}>Edit</MySmallButton>
                    <MySmallButton onClick={() => delCity(city.id)} className='smallButtonDelete'>
                      Delete
                    </MySmallButton>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </div>
      <form onSubmit={(e) => addCity(e)} className={'form'}>
        <div className='errorContainer'>
          <MyError>{cityError || error}</MyError>
        </div>
        <MyLabel discription={'Add city to the list'} />
        <MyInput
          type='text'
          name='city'
          placeholder={'Enter the name of the city'}
          error={cityError || error}
          value={city}
          onFocus={() => {
            setCityError('')
            setError('')
          }}
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
        <div className='errorContainer'>
          <MyError>{priceForHourError}</MyError>
        </div>
        <MyLabel discription={'Add price for hour'} />
        <MyInput
          type='text'
          name='price'
          placeholder={'Enter the price for hour'}
          value={priceForHour}
          error={priceForHourError}
          onFocus={() => setPriceForHourError('')}
          onChange={(e) => {
            changePriceForHour(e)
          }}
        />
        <MyButton>Add city</MyButton>
      </form>
    </div>
  )
}

export default Cities
