import './UserPage.css'
import { useNavigate } from 'react-router-dom'
import { parse } from 'date-fns'
import AddOrderForm from '../../components/ReactHookForms/AddOrder/AddOrderForm'
import userAPI from '../../api/userAPI'
import { FC, useState } from 'react'
import { createOrderStepOneThunk } from '../../store/createOrder/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useToasts } from 'react-toast-notifications'
import { PulseLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import React from 'react'
import { ICreateOrder, ICurrentPriceInfo } from '../../types/createOrder.types'

const UserForm: FC = () => {
  const { name: currentUserName, email: currentUserEmail } = useAppSelector(
    (state) => state.auth.currentUser
  )
  const { inProcess } = useAppSelector((state) => state.createOrder)
  const { email, name, clockId, cityId, startTime, priceForHour, timeToFix, images } =
    useAppSelector((state) => state.createOrder.data)

  const emailField = currentUserEmail ? currentUserEmail : email
  const nameField = currentUserName ? currentUserName : name
  const startTimeField = startTime
    ? parse(startTime as string, 'yyyy.MM.dd, HH:mm', new Date())
    : ''

  const [submitError, setSubmitError] = useState(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addToast } = useToasts()

  const onSubmit = async (formData: ICreateOrder) => {
    const { email } = formData
    const user = await userAPI.getUserByEmail(email)
    if (!user) {
      const stepOne = await dispatch(createOrderStepOneThunk(formData))
      if (isFulfilled(stepOne)) {
        navigate('/user/registration')
      } else if (isRejected(stepOne)) {
        addToast('Something went wrong', {
          transitionState: 'entered',
          appearance: 'error'
        })
      }
    } else {
      if (user.role !== 'Customer') {
        setSubmitError(Date.now)
        addToast('This user cannot create orders', {
          transitionState: 'entered',
          appearance: 'error'
        })
        return
      }
      const stepOne = await dispatch(createOrderStepOneThunk(formData))
      if (isFulfilled(stepOne)) {
        if (currentUserEmail === user.email && user.isEmailActivated) {
          if (formData.name !== currentUserName) {
            navigate(`/user/changeName`, { replace: true })
            return
          } else {
            navigate(`/user/chooseMaster`, { replace: true })
            return
          }
        }
        if (currentUserEmail !== user.email && user.isEmailActivated) {
          navigate('/user/login')
          return
        } else {
          navigate('/user/chooseMaster')
          return
        }
      } else if (isRejected(stepOne)) {
        addToast('Something went wrong', {
          transitionState: 'entered',
          appearance: 'error'
        })
      }
    }
  }

  return (
    <div className='userPage'>
      <AddOrderForm
        onSubmit={(formData) => onSubmit(formData)}
        formFields={{
          name: nameField,
          email: emailField,
          clockId,
          cityId,
          startTime: startTimeField,
          images
        }}
        currentPriceInfo={{ priceForHour, timeToFix } as ICurrentPriceInfo}
        submitError={submitError}
        disableEmail={!!currentUserEmail}
        inProcess={inProcess}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
      />
    </div>
  )
}

export default UserForm
