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
        setPriceForHour(city.priceForHour)
      })
      .then(() => setIsLoadnig(false))
  }, [id])

  const onBlurCity = () => {
    setCityError('')
    setError('')
  }
  const onBlurPriceForHour = () => {
    setPriceForHourError('')
    setError('')
  }

  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }
  const editCity = async (e) => {
    e.preventDefault()
    setError('')
    if (!cityName || !priceForHour) {
      if (!cityName) {
        setCityError(requiredField)
      }
      if (!priceForHour) {
        setPriceForHourError(priceForHourField)
      }
      return
    }
    if (cityError || priceForHourError) {
      return
    }
    const editedCity = await citiesAPI.editCity(id, cityName, priceForHour)
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
        onBlur={() => onBlurCity()}
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />

      <div className='errorContainer'>
        <MyError>{priceForHourError}</MyError>
      </div>
      <MyLabel discription={'Edit price for hour'} />
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
      <div className='myButtonWrapper'>
        <MyBigButton>Edit city</MyBigButton>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)}>Cancel</MyBigButton>
      </div>
    </form>
  )
}

export default EditCity
