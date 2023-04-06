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
  const [error, setError] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const requiredField = 'Required field'

  useEffect(() => {
    citiesAPI
      .getCities()
      .then((cities) => setCities(cities))
      .then(() => setIsLoading(false))
  }, [])

  const onBlurCity = () => {
    setCityError('')
    setError('')
  }
  const onBlurPriceForHour = () => {
    setPriceForHourError('')
    setError('')
  }
  const addCity = async (e) => {
    e.preventDefault()
    setError('')

    if (!city || !priceForHour) {
      if (!city) {
        setCityError(requiredField)
      }
      if (!priceForHour) {
        setPriceForHourError(requiredField)
      }
      return
    }
    if (cityError || priceForHourError) {
      return
    }

    const newCity = await citiesAPI.addCity(city, priceForHour)
    if (newCity) {
      setCities([...cities, newCity])
      setCity('')
      setPriceForHour('')
    } else {
      setError('A city with that name alredy exist or incorrect price for hour')
    }
  }

  const delCity = (id) => {
    citiesAPI.delCity(id).then((city) => {
      if (!city) {
        setCityError('Cannot be deleted, city is in use')
        setTimeout(() => {
          setCityError('')
        }, 1500)
      } else {
        setCities(cities.filter((city) => city.id !== id))
      }
    })
  }

  if (isLoading === true) return <MySpan>The list of cities is loading...</MySpan>

  return (
    <div className={'itemContent'}>
      <div className='cities'>
        <ul className={'list'}>
          {cities.length === 0 ? (
            <MySpan>The list of cities is empty</MySpan>
          ) : (
            cities.map((city) => {
              return (
                <li id={city.id} key={city.id} className={'listItem'}>
                  <div className='itemInfo'>
                    <MySpan>City: {city.name},</MySpan>
                    <MySpan>Price for hour: {city.priceForHour} USD,</MySpan>
                  </div>
                  <div className='buttons'>
                    <MySmallButton to={`${city.id}`}>Edit</MySmallButton>
                    <MySmallButton onClick={() => delCity(city.id)}>Delete</MySmallButton>
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
          value={city}
          onBlur={() => onBlurCity()}
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
        <div className='errorContainer'>
          <MyError>{priceForHourError}</MyError>
        </div>
        <MyLabel discription={'Add price for hour'} />
        <MyInput
          type='number'
          name='price'
          placeholder={'Enter the price for hour'}
          value={priceForHour}
          onBlur={() => onBlurPriceForHour()}
          onChange={(e) => {
            setPriceForHour(Number(e.target.value))
          }}
        />
        <MyButton>Add city</MyButton>
      </form>
    </div>
  )
}

export default Cities
