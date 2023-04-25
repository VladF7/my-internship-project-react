import { useEffect, useState } from 'react'
import citiesAPI from '../../../api/citiesAPI'
import MyButton from '../../../components/Buttons/BigButton/MyBigButton'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import MyError from '../../../components/Error/MyError'
import './Cities.css'
import MySpan from '../../../components/Span/MySpan'
import { formatValueToDecimal, formatValueToInteger } from '../../../helpers'
import MyInputItem from '../../../components/InputItem/MyInputItem'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'

const Cities = () => {
  const [city, setCity] = useState('')
  const [priceForHour, setPriceForHour] = useState('')
  const [cities, setCities] = useState([])
  const [cityError, setCityError] = useState('')
  const [priceForHourError, setPriceForHourError] = useState('')
  const [cityId, setCityId] = useState('')
  const [addCityerror, setAddCityError] = useState('')
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

  const resetError = (setError) => {
    setError('')
    setAddCityError('')
  }

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

  const addCity = async (e) => {
    e.preventDefault()
    setAddCityError('')
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
      setAddCityError('A city with that name alredy exist')
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

  if (isLoading)
    return (
      <div className='adminPage'>
        <div className={'navBar'}>
          <AdminNavBar />
        </div>
        <div className='adminItem'>
          <MySpan>The list of cities is loading...</MySpan>
        </div>
      </div>
    )

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
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
          <MyInputItem
            value={city}
            error={cityError || addCityerror}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => resetError(setCityError)}
            item={{
              id: 'city',
              type: 'text',
              placeholder: 'Enter the name of the city',
              discription: 'Add city to the list'
            }}
          />
          <MyInputItem
            value={priceForHour}
            error={priceForHourError}
            onChange={(e) => changePriceForHour(e)}
            onFocus={() => resetError(setPriceForHourError)}
            item={{
              id: 'city',
              type: 'text',
              placeholder: 'Enter the price for hour',
              discription: 'Add price for hour'
            }}
          />
          <div className='myButtonWrapper'>
            <MyButton>Add city</MyButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cities
