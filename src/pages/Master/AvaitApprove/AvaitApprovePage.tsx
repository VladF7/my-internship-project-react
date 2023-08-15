import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import React, { FC } from 'react'

const AwaitApprovePage: FC = () => {
  const navigate = useNavigate()

  const message = `You need await approve form admin`

  const goBack = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>Need approve</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)}>Go to main page</MyBigButton>
      </div>
    </div>
  )
}

export default AwaitApprovePage
