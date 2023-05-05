import { useEffect, useState } from 'react'
import citiesAPI from '../../../api/citiesAPI'
import './Cities.css'
import MySpan from '../../../components/Span/MySpan'
import { formatValueToDecimal } from '../../../helpers'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import ThreeDotsMenu from '../../../components/ThreeDotsMenu/ThreeDotsMenu'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'

const Cities = () => {
  const [cities, setCities] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToasts()
  const navigate = useNavigate()

  const currency = 'USD'

  useEffect(() => {
    citiesAPI
      .getCities()
      .then((cities) => setCities(cities))
      .then(() => setIsLoading(false))
  }, [])

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
                        elements={[
                          {
                            iconType: <FiEdit color='lightsalmon' />,
                            action: () => goToEdit(city.id),
                            label: 'Edit city',
                            hidden: false,
                            disabled: false
                          },
                          {
                            iconType: <RiDeleteBin5Line color='red' />,
                            action: () => deleteCity(city.id),
                            label: 'Delete',
                            hidden: false,
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
        <div className='addButtonWrapper form'>
          <MyLinkButton to='add'>Add city</MyLinkButton>
        </div>
      </div>
    </div>
  )
}

export default Cities
