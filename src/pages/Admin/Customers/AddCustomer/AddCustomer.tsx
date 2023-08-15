import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import AddCustomerForm from '../../../../components/ReactHookForms/AddCustomer/AddCustomerForm'
import { PulseLoader } from 'react-spinners'
import { useToasts } from 'react-toast-notifications'
import { addCustomerThunk } from '../../../../store/customers/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import React from 'react'
import { ISignUpForm } from '../../../../types/user.types'

const AddCustomer: React.FC = () => {
  const [submitError, setSubmitError] = useState(0)

  const { inProcess } = useAppSelector((state) => state.customers)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData: ISignUpForm) => {
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
