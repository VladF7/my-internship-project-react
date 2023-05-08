import './UserPage.css'
import { useNavigate } from 'react-router-dom'
import { parse } from 'date-fns'
import { useSelector } from 'react-redux'
import AddOrderForm from '../../components/ReactHookForms/AddOrder/AddOrderForm'
import { saveUserData } from '../../services/user'
import userAPI from '../../api/userAPI'
import { useState } from 'react'

const UserForm = () => {
  const currentUserEmail = useSelector((state) => state.auth.currentUser.email)
  const currentUserName = useSelector((state) => state.auth.currentUser.name)

  const email = currentUserEmail || JSON.parse(sessionStorage.getItem('email')) || ''
  const name = currentUserName || JSON.parse(sessionStorage.getItem('name')) || ''
  const clockId = JSON.parse(sessionStorage.getItem('clockId')) || ''
  const cityId = JSON.parse(sessionStorage.getItem('cityId')) || ''
  const date = sessionStorage.getItem('startTime')
    ? parse(JSON.parse(sessionStorage.getItem('startTime')), 'yyyy.MM.dd, HH:mm', new Date())
    : ''
  const priceForHour = JSON.parse(sessionStorage.getItem('priceForHour')) || ''
  const timeToFix = JSON.parse(sessionStorage.getItem('timeToFix')) || ''

  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    const email = formData.email
    const user = await userAPI.getUserByEmail(email)
    if (!user) {
      await saveUserData(formData)
      navigate('/user/registration')
      return
    } else {
      if (user.role !== 'Customer') {
        setSubmitError(Date.now)
        return
      }
      await saveUserData(formData)
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
      } else {
        navigate('/user/chooseMaster')
      }
    }
  }

  return (
    <div className='userPage'>
      <AddOrderForm
        onSubmit={(formData) => onSubmit(formData)}
        formFields={{ name, email, clockId, cityId, date }}
        currentPriceInfo={{ priceForHour, timeToFix }}
        submitError={submitError}
        disableEmail={!!currentUserEmail}
      />
    </div>
  )
}

export default UserForm
