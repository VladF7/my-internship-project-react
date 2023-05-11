import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import AddCustomerForm from '../../../../components/ReactHookForms/AddCustomer/AddCustomerForm'
import { PulseLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { addCustomerThunk } from '../../../../store/customers/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'

const AddCustomer = () => {
  const [submitError, setSubmitError] = useState('')

  const { inProcess } = useSelector((state) => state.customers)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData) => {
    const successCustomerRegistration = await dispatch(addCustomerThunk(formData))

    if (isFulfilled(successCustomerRegistration)) {
      addToast('Customer has been created', {
        transitionState: 'entered',
        appearance: 'success'
      })
      navigate('/admin/customers')
    } else if (isRejected(successCustomerRegistration)) {
      addToast('Customer cannot be created', {
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
        <AddCustomerForm
          onSubmit={onSubmit}
          submitError={submitError}
          inProcess={inProcess}
          loader={<PulseLoader color='lightsalmon' size='10px' />}
        />
      </div>
    </div>
  )
}

export default AddCustomer
