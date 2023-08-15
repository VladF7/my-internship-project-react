import React, { useState } from 'react'
import AddEditCityForm from '../../../../components/ReactHookForms/AddEditCity/AddEditCityForm'
import { useNavigate } from 'react-router-dom'
import '../Cities.css'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import { PulseLoader } from 'react-spinners'
import { useToasts } from 'react-toast-notifications'
import { addCityThunk } from '../../../../store/cities/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { ICityForm } from '../../../../types/city.types'

const AddCity: React.FC = () => {
  const [submitError, setSubmitError] = useState(0)

  const { inProcess } = useAppSelector((state) => state.cities)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData: ICityForm) => {
    const newCity = await dispatch(addCityThunk(formData))
    if (isFulfilled(newCity)) {
      addToast('City has been created', {
        transitionState: 'entered',
        appearance: 'success'
      })
      navigate('/admin/cities')
    } else if (isRejected(newCity)) {
      addToast('City cannot be created', {
        transitionState: 'entered',
        appearance: 'error'
      })
      setSubmitError(Date.now)
    }
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <AddEditCityForm
          onSubmit={onSubmit}
          submitError={submitError}
          inProcess={inProcess}
          loader={<PulseLoader color='lightsalmon' size='10px' />}
        ></AddEditCityForm>
      </div>
    </div>
  )
}

export default AddCity
