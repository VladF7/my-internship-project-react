import { useState } from 'react'
import AddEditCityForm from '../../../../components/ReactHookForms/AddEditCity/AddEditCityForm'
import { useNavigate } from 'react-router-dom'
import '../Cities.css'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import { PulseLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { addCityThunk } from '../../../../store/cities/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'

const AddCity = () => {
  const [submitError, setSubmitError] = useState('')

  const { inProcess } = useSelector((state) => state.cities)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData) => {
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
