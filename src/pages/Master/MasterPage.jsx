import { useSelector } from 'react-redux'
import './MasterPage.css'
import '../Admin/AdminPage.css'
import { useEffect, useState } from 'react'
import MySpan from '../../components/Span/MySpan'
import { formatValueToDecimal } from '../../helpers'
import ordersAPI from '../../api/ordersAPI'
import { useToasts } from 'react-toast-notifications'
import { Button } from '@mui/material'

const MasterPage = () => {
  const [orderId, setOrderId] = useState('')
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const id = useSelector((state) => state.auth.currentUser.masterId)
  const currency = 'USD'

  const { addToast } = useToasts()

  useEffect(() => {
    ordersAPI
      .getOrdersForMastrerById(id)
      .then((orders) => setOrders(orders))
      .then(() => setIsLoading(false))
  }, [orderId])

  const completeOrder = async (id) => {
    const order = await ordersAPI.completeOrder(id)
    if (!order) {
      addToast('Order status cannot be changed', {
        transitionState: 'entered',
        appearance: 'error'
      })
    } else {
      addToast('Order status has been changed', {
        transitionState: 'entered',
        appearance: 'success'
      })
      setOrderId(id)
    }
  }
  const sendCheckOnPayment = async (id) => {
    const order = await ordersAPI.completeOrder(id)
    if (!order) {
      addToast('Message cannot be send', {
        transitionState: 'entered',
        appearance: 'error'
      })
    } else {
      addToast('Message with success order info has been send', {
        transitionState: 'entered',
        appearance: 'success'
      })
    }
  }

  if (isLoading) {
    return (
      <div className='masterPage'>
        <MySpan>Orders is loading, please wait...</MySpan>
      </div>
    )
  }

  return (
    <div className='masterPage'>
      {!orders.length ? (
        <MySpan>{`You don't have orders`}</MySpan>
      ) : (
        orders.map((order) => {
          return (
            <li id={order.id} key={order.id} className='listItem'>
              <div className='itemInfo'>
                <MySpan>Name: {order.customer.name},</MySpan>
                <MySpan>Clock size: {order.clock.size},</MySpan>
                <MySpan>Time to fix: {order.clock.timeToFix},</MySpan>
                <MySpan>City: {order.city.name},</MySpan>
                <MySpan>Order start time: {order.startTime},</MySpan>
                <MySpan>Order end time: {order.endTime}</MySpan>
                <MySpan>
                  Order price: {formatValueToDecimal(order.price)} {currency}
                </MySpan>
                <MySpan>Order status: {order.status}</MySpan>
              </div>

              <div className='buttons'>
                <Button
                  disabled={order.status !== 'Completed'}
                  size='small'
                  variant='outlined'
                  sx={{
                    marginLeft: '15px',
                    backgroundColor: 'rgb(255, 160, 122 ,0.4)',
                    borderColor: 'rgb(255, 160, 122)',
                    color: 'rgba(255,255,255, 0.9)',
                    ':hover': {
                      backgroundColor: 'rgb(255, 160, 122,0.6)',
                      borderColor: 'rgb(255, 160, 122)'
                    }
                  }}
                  onClick={() => sendCheckOnPayment(order.id)}
                >
                  Send check on payment
                </Button>
                <Button
                  sx={{
                    marginLeft: '15px',
                    backgroundColor: 'rgb(30, 130, 76, 0.4)',
                    borderColor: 'rgb(30, 130, 76)',
                    color: 'rgba(255,255,255, 0.9)',
                    ':hover': {
                      backgroundColor: 'rgb(30, 130, 76, 0.6)',
                      borderColor: 'rgb(30, 130, 76)'
                    }
                  }}
                  size='small'
                  variant='outlined'
                  disabled={
                    order.status === 'Payment Success'
                      ? false
                      : order.status === 'Await Payment'
                      ? false
                      : true
                  }
                  onClick={() => completeOrder(order.id)}
                >
                  Complete order
                </Button>
              </div>
            </li>
          )
        })
      )}
    </div>
  )
}

export default MasterPage
