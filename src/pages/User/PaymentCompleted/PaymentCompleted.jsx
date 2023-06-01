import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MyLinkButton from '../../../components/Buttons/BigButton/MyLinkButton'
import MySpan from '../../../components/Span/MySpan'
import { useDispatch } from 'react-redux'
import { clearCreateOrderData } from '../../../store/createOrder/slice'

const PaymentCompleted = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(clearCreateOrderData())
  }, [])
  const message = `Your order has been successfully created, payment successful completed.
  An email will be sent to you with additional information.`

  const goBack = (e) => {
    e.preventDefault()
    navigate('/')
  }
  return (
    <div className='userPage'>
      <div className='content'>
        <MySpan>{message}</MySpan>
      </div>
      <div className='myButtonWrapper'>
        <MyLinkButton onClick={(e) => goBack(e)}>Done</MyLinkButton>
      </div>
    </div>
  )
}

export default PaymentCompleted
