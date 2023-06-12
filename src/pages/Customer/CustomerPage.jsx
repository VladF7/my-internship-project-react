import { useSelector } from 'react-redux'
import './CustomerPage.css'
import '../Admin/AdminPage.css'
import { useEffect, useState } from 'react'
import MySpan from '../../components/Span/MySpan'
import { formatValueToDecimal } from '../../helpers'
import ordersAPI from '../../api/ordersAPI'
import { useToasts } from 'react-toast-notifications'
import FeedbackModal from '../../components/Modal/FeedbackModal'
import { Box, Rating } from '@mui/material'

const CustomerPage = () => {
  const [orders, setOrders] = useState([])
  const [feedbackToken, setFeedbackToken] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const id = useSelector((state) => state.auth.currentUser.customerId)
  const currency = 'USD'

  const { addToast } = useToasts()

  useEffect(() => {
    ordersAPI
      .getOrdersForCustomerById(id)
      .then((orders) => setOrders(orders))
      .then(() => setIsLoading(false))
  }, [feedbackToken])

  const submit = async (feedbackToken, formData) => {
    try {
      await ordersAPI.setFeedback(feedbackToken, formData)
      addToast('Feedback has been send', {
        transitionState: 'entered',
        appearance: 'success'
      })
      setFeedbackToken(feedbackToken)
    } catch (error) {
      addToast('Feedback can not be send', {
        transitionState: 'entered',
        appearance: 'error'
      })
    }
  }

  if (isLoading) {
    return (
      <div className='customerPage'>
        <MySpan>Orders is loading, please wait...</MySpan>
      </div>
    )
  }

  return (
    <div className='customerPage'>
      {!orders.length ? (
        <MySpan>{`You don't have orders`}</MySpan>
      ) : (
        orders.map((order) => {
          return (
            <li id={order.id} key={order.id} className='listItem'>
              <div className='itemInfo'>
                <MySpan>Master name: {order.master.name},</MySpan>
                <MySpan>Clock size: {order.clock.size},</MySpan>
                <MySpan>Time to fix: {order.clock.timeToFix},</MySpan>
                <MySpan>City: {order.city.name},</MySpan>
                <MySpan>Order start time: {order.startTime},</MySpan>
                <MySpan>Order end time: {order.endTime}</MySpan>
                <MySpan>
                  Order price: {formatValueToDecimal(order.price)} {currency}
                </MySpan>
                <MySpan>Order status: {order.status}</MySpan>
                {order.status === 'Completed' &&
                  (order.rating ? (
                    <>
                      <Box display={'flex'} alignItems={'center'}>
                        <MySpan>Order rating: </MySpan>
                        <Rating
                          sx={{ pl: '3px', color: 'lightsalmon' }}
                          readOnly
                          name='read-only'
                          value={order.rating}
                        />
                      </Box>
                      {order.comment && <MySpan>Order comment: {order.comment}</MySpan>}
                    </>
                  ) : (
                    <FeedbackModal
                      onSubmit={(formData) => {
                        submit(order.feedbackToken, formData)
                      }}
                    />
                  ))}
              </div>
            </li>
          )
        })
      )}
    </div>
  )
}

export default CustomerPage
