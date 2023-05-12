import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import AddMasterForm from '../../../../components/ReactHookForms/AddMaster/AddMasterForm'
import { addMasterThunk } from '../../../../store/masters/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useToasts } from 'react-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'

const AddMaster = () => {
  const [submitError, setSubmitError] = useState('')

  const { inProcess } = useSelector((state) => state.masters)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData) => {
    const successMasterRegistration = await dispatch(addMasterThunk(formData))
    if (isFulfilled(successMasterRegistration)) {
      addToast('Master has been created', {
        transitionState: 'entered',
        appearance: 'success'
      })
      navigate('/admin/masters')
    } else if (isRejected(successMasterRegistration)) {
      addToast('Master cannot be created', {
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
        <AddMasterForm
          onSubmit={onSubmit}
          submitError={submitError}
          inProcess={inProcess}
          loader={<PulseLoader color='lightsalmon' size='10px' />}
        />
      </div>
    </div>
  )
}

export default AddMaster
