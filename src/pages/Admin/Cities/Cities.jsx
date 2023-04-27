import { useEffect, useState } from 'react'
import citiesAPI from '../../../api/citiesAPI'
import MyButton from '../../../components/Buttons/BigButton/MyBigButton'
import './Cities.css'
import MySpan from '../../../components/Span/MySpan'
import { changeShowActionsFor, formatValueToDecimal, formatValueToInteger } from '../../../helpers'
import MyInputItem from '../../../components/InputItem/MyInputItem'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import ThreeDotsMenu from '../../../components/ThreeDotsMenu/ThreeDotsMenu'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Cities = () => {
  const [city, setCity] = useState('')
  const [priceForHour, setPriceForHour] = useState('')
  const [cities, setCities] = useState([])
  const [cityError, setCityError] = useState('')
  const [priceForHourError, setPriceForHourError] = useState('')
  const [addCityerror, setAddCityError] = useState('')
  const [showActionsFor, setShowActionsFor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToasts()
  const navigate = useNavigate()

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
  const goToEdit = (id) => {
    navigate(`${id}`)
  }

  const deleteCity = (id) => {
    citiesAPI.delCity(id).then((city) => {
      if (!city) {
        addToast('City cannot be deleted, city is in use', {
          transitionState: 'entered',
          appearance: 'error'
        })
        return
      } else {
        setCities(cities.filter((city) => city.id !== id))
      }
    })
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
                    <div className='itemInfo'>
                      <MySpan>City: {city.name},</MySpan>
                      <MySpan>
                        Price for hour: {formatValueToDecimal(city.priceForHour)} {currency},
                      </MySpan>
                    </div>
                    <div className='buttons'>
                      <ThreeDotsMenu
                        click={() =>
                          changeShowActionsFor(city.id, showActionsFor, setShowActionsFor)
                        }
                        showActionsFor={showActionsFor}
                        id={city.id}
                        elements={[
                          {
                            iconType: <FiEdit color='lightsalmon' />,
                            action: () => goToEdit(city.id),
                            label: 'Edit city',
                            disabled: false
                          },
                          {
                            iconType: <RiDeleteBin5Line color='red' />,
                            action: () => deleteCity(city.id),
                            label: 'Delete',
                            disabled: false
                          }
                        ]}
                      />
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
