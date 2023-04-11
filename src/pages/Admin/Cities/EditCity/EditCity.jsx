import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import MyError from '../../../../components/Error/MyError'
import MyInput from '../../../../components/Input/MyInput'
import MyLabel from '../../../../components/Label/MyLabel'
import MySpan from '../../../../components/Span/MySpan'

const EditCity = () => {
  const { id } = useParams()
  const prevPage = useNavigate()
  const [isLoading, setIsLoadnig] = useState(true)
  const [cityName, setCityName] = useState('')
  const [priceForHour, setPriceForHour] = useState('')
  const [cityError, setCityError] = useState('')
  const [error, setError] = useState('')
  const [priceForHourError, setPriceForHourError] = useState('')
  const requiredField = 'Required field'
  const priceForHourField = 'Must be not empty and not null'

  useEffect(() => {
    citiesAPI
      .getCityById(id)
      .then((city) => {
        setCityName(city.name)
        setPriceForHour(formatValueToDecimal(city.priceForHour))
      })
      .then(() => setIsLoadnig(false))
  }, [id])

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

  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }
  const editCity = async (e) => {
    e.preventDefault()
    setError('')
    const formattedPriceForHour = formatValueToInteger(priceForHour)

    if (!cityName || !priceForHour || formattedPriceForHour === 0) {
      if (!cityName) {
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

    const editedCity = await citiesAPI.editCity(id, cityName, formattedPriceForHour)
    if (editedCity) {
      await citiesAPI.getCities()
      prevPage(-1)
    } else {
      setError('A city with that name alredy exist')
    }
  }
  if (isLoading) {
    return <MySpan>Data is loading, please wait...</MySpan>
  }
  return (
    <form onSubmit={(e) => editCity(e)} className={'form'}>
      <div className='errorContainer'>
        <MyError>{cityError || error}</MyError>
      </div>
      <MyLabel discription={'Edit city name'} />
      <MyInput
        type='text'
        name='city'
        placeholder={'Enter the name of the city'}
        value={cityName}
        error={cityError || error}
        onFocus={() => {
          setCityError('')
          setError('')
        }}
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />

      <div className='errorContainer'>
        <MyError>{priceForHourError}</MyError>
      </div>
      <MyLabel discription={'Edit price for hour'} />
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
      <div className='myButtonWrapper'>
        <MyBigButton>Edit city</MyBigButton>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
          Cancel
        </MyBigButton>
      </div>
    </form>
  )
}

export default EditCity
