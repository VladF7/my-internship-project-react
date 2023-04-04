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
  const [cities, setCities] = useState([])
  const [cityError, setCityError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const requiredField = 'Required field'
  const existingField = 'A city with that name already exists'

  useEffect(() => {
    citiesAPI
      .getCities()
      .then((cities) => setCities(cities))
      .then(() => setIsLoading(false))
  }, [])

  const onBlurCity = (e) => {
    if (e.target.value !== 0) {
      return setCityError('')
    }
  }

  const addCity = (e) => {
    e.preventDefault()

    if (!city) {
      return setCityError(requiredField)
    }

    citiesAPI.addCity(e).then((city) => {
      if (!city) {
        return setCityError(existingField)
      }
      setCities([...cities, city])
    })

    setCity('')
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
                    <MySpan>{city.name}</MySpan>
                  </div>
                  <div className='buttons'>
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
          <MyError>{cityError}</MyError>
        </div>
        <MyLabel discription={'Add city to the list'} />
        <MyInput
          type='text'
          name='city'
          placeholder={'Enter the name of the city'}
          value={city}
          onBlur={(e) => onBlurCity(e)}
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
        <MyButton>Add city</MyButton>
      </form>
    </div>
  )
}

export default Cities
