import { useEffect } from 'react'
import './Cities.css'
import MySpan from '../../../components/Span/MySpan'
import { formatValueToDecimal } from '../../../helpers'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import { deleteCityThunk, getCitiesThunk } from '../../../store/cities/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import React from 'react'

const Cities: React.FC = () => {
  const { isLoading, cities } = useAppSelector((state) => state.cities)
  const currency = 'USD'

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCitiesThunk())
  }, [])

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const goToEdit = (id: number) => {
    navigate(`${id}`)
  }

  const deleteCity = async (id: number) => {
    const deletedCity = await dispatch(deleteCityThunk(id))
    if (isFulfilled(deletedCity)) {
      addToast('City has been deleted', {
        transitionState: 'entered',
        appearance: 'success'
      })
    } else if (isRejected(deletedCity)) {
      addToast('City cannot be deleted, city is in use', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        {isLoading ? (
          <MySpan>The list of cities is loading...</MySpan>
        ) : (
          <div className='cities'>
            <ul className={'list'}>
              {!cities.length ? (
                <MySpan>The list of cities is empty</MySpan>
              ) : (
                cities.map((city) => {
                  return (
                    <li key={city.id} className={'listItem'}>
                      <div className='itemInfo'>
                        <MySpan>City: {city.name},</MySpan>
                        <MySpan>
                          Price for hour: {`${formatValueToDecimal(city.priceForHour)}`} {currency},
                        </MySpan>
                      </div>
                      <div className='buttons'>
                        <DropDownMenu
                          elements={[
                            {
                              iconType: <FiEdit color='rgba(35, 43, 85)' />,
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
        )}
        {!isLoading && (
          <div className='addButtonWrapper form'>
            <MyLinkButton to='add'>Add city</MyLinkButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cities
