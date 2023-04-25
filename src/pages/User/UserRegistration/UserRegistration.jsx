import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import { useState } from 'react'
import MyError from '../../../components/Error/MyError'
import userAPI from '../../../api/userAPI'

const UserRegistration = () => {
  const navigate = useNavigate()

  const [createUserCustomerError, setCreateUserCustomerError] = useState('')

  const name = JSON.parse(sessionStorage.getItem('name'))
  const email = JSON.parse(sessionStorage.getItem('email'))
  const message = `A message with login information will be sent to your email.`

  const goNext = (e) => {
    e.preventDefault()
    navigate('/user/chooseMaster', { replace: true })
  }
  const createUser = async () => {
    const newUser = await userAPI.createUserCustomer(email, name)
    if (!newUser) {
      setCreateUserCustomerError("User can't be created")
      setTimeout(() => {
        setCreateUserCustomerError('')
      }, 1500)
    } else {
      navigate('/user/chooseMaster', { replace: true })
    }
  }
  return (
    <div className='userPage'>
      <div className='content'>
        <MyError>{createUserCustomerError}</MyError>
        <MyLabel>Do you want to create account ?</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => goNext(e)} className='backBigButton'>
            No
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton onClick={() => createUser()}>Yes</MyBigButton>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration
