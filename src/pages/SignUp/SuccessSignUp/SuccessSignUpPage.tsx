import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import React, { FC } from 'react'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'

const SuccessSignUp: FC = () => {
  const navigate = useNavigate()

  const message = `Sign up has been successfully.
  For login you need confirm your email, follow the activation link from your email message.`

  const goBack = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate('/login')
  }
  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>Successfully sign up </MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)}>Done</MyBigButton>
      </div>
    </div>
  )
}

export default SuccessSignUp
