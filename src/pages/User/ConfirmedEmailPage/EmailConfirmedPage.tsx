import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import { FC } from 'react'
import React from 'react'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'

const EmailConfirmedPage: FC = () => {
  const navigate = useNavigate()

  const message = `This email has already been confirmed`

  const goBack = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>Email Confirmed</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)}>Go to main page</MyBigButton>
      </div>
    </div>
  )
}

export default EmailConfirmedPage
