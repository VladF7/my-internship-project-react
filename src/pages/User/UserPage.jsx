import './UserPage.css'
import { useNavigate } from 'react-router-dom'
import { parse } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import AddOrderForm from '../../components/ReactHookForms/AddOrder/AddOrderForm'
import userAPI from '../../api/userAPI'
import { useState } from 'react'
import { createOrderStepOneThunk } from '../../store/createOrder/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useToasts } from 'react-toast-notifications'
import { PulseLoader } from 'react-spinners'

const UserForm = () => {
  const { name: currentUserName, email: currentUserEmail } = useSelector(
    (state) => state.auth.currentUser
  )
  const { inProcess } = useSelector((state) => state.createOrder)
  const { email, name, clockId, cityId, startTime, priceForHour, timeToFix, images } = useSelector(
    (state) => state.createOrder.data
  )

  const emailField = currentUserEmail ? currentUserEmail : email
  const nameField = currentUserName ? currentUserName : name
  const startTimeField = startTime ? parse(startTime, 'yyyy.MM.dd, HH:mm', new Date()) : ''

  const [submitError, setSubmitError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { addToast } = useToasts()

  const onSubmit = async (formData) => {
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
        currentPriceInfo={{ priceForHour, timeToFix }}
        submitError={submitError}
        disableEmail={!!currentUserEmail}
        inProcess={inProcess}
        loader={<PulseLoader color='lightsalmon' size='10px' />}
      />
    </div>
  )
}

export default UserForm
