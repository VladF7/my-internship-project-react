import { useNavigate } from 'react-router-dom'
import MySpan from '../../../components/Span/MySpan'
import MyLabel from '../../../components/Label/MyLabel'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import { leaveNameForCreateOrderData } from '../../../store/createOrder/slice'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import React, { FC } from 'react'

const ChangeNamePage: FC = () => {
  const { name: currentUserName, email: currentUserEmail } = useAppSelector(
    (state) => state.auth.currentUser
  )
  const { name } = useAppSelector((state) => state.createOrder.data)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const message = `
  The profile with email ${currentUserEmail} has name ${currentUserName}. 
  When placing an order, was specified different name - ${name}, do you want to change the name of the profile? `

  const changeName = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    navigate(`/user/chooseMaster`, { replace: true })
  }
  const leaveName = (e: React.SyntheticEvent<EventTarget, Event>) => {
    e.preventDefault()
    dispatch(leaveNameForCreateOrderData(currentUserName))
    navigate(`/user/chooseMaster`, { replace: true })
  }

  return (
    <div className='userPage'>
      <div className='content'>
        <MyLabel>do you want to change the name of the profile</MyLabel>
        <MySpan>{message}</MySpan>
      </div>
      <div className='buttonBoxWrapper'>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => leaveName(e)} className='backBigButton'>
            No
          </MyBigButton>
        </div>
        <div className='buttonBox'>
          <MyBigButton onClick={(e) => changeName(e)}>Yes</MyBigButton>
        </div>
      </div>
    </div>
  )
}

export default ChangeNamePage
