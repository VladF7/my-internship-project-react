import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import MySpan from '../../../../components/Span/MySpan'
import { formatValueToDecimal } from '../../../../helpers'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import AddEditCityForm from '../../../../components/ReactHookForms/AddEditCity/AddEditCityForm'
import { useToasts } from 'react-toast-notifications'
import { editCityThunk } from '../../../../store/cities/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { PulseLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { ICityForm } from '../../../../types/city.types'
import React from 'react'

const EditCity: React.FC = () => {
  const [isLoading, setIsLoadnig] = useState(true)
  const [name, setName] = useState('')
  const [priceForHour, setPriceForHour] = useState(0)
  const [submitError, setSubmitError] = useState(0)

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      citiesAPI
        .getCityById(id)
        .then((city) => {
          setName(city.name)
          setPriceForHour(formatValueToDecimal(city.priceForHour))
        })
        .then(() => setIsLoadnig(false))
    }
  }, [id])

  const { inProcess } = useAppSelector((state) => state.cities)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData: ICityForm) => {
    if (id) {
      const editedCity = await dispatch(editCityThunk({ id, formData }))
      if (isFulfilled(editedCity)) {
        addToast('City has been edited', {
          transitionState: 'entered',
          appearance: 'success'
        })
        navigate('/admin/cities')
      } else if (isRejected(editedCity)) {
        addToast('City cannot be edited', {
          transitionState: 'entered',
          appearance: 'error'
        })
        setSubmitError(Date.now)
      }
    }
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        {isLoading ? (
          <MySpan>Data is loading, please wait...</MySpan>
        ) : (
          <AddEditCityForm
            formFields={{ name, priceForHour }}
            onSubmit={onSubmit}
            submitError={submitError}
            inProcess={inProcess}
            loader={<PulseLoader color='lightsalmon' size='10px' />}
          ></AddEditCityForm>
        )}
      </div>
    </div>
  )
}

export default EditCity
