import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import { clearCreateOrderData } from '../../../store/createOrder/slice'
import React from 'react'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import { useAppDispatch } from '../../../hooks/hooks'

const SuccessOrder: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(clearCreateOrderData())
  }, [])
  const message = `Your order has been successfully created.
  An email will be sent to you with additional information.`

  const goBack = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate('/')
  }
  return (
    <div className='userPage'>
      <div className='content'>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)}>Done</MyBigButton>
      </div>
    </div>
  )
}

export default SuccessOrder
