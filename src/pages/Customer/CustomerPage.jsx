import { useSelector } from 'react-redux'
import './CustomerPage.css'
import '../Admin/AdminPage.css'
import { useEffect, useState } from 'react'
import MySpan from '../../components/Span/MySpan'
import { formatValueToDecimal } from '../../helpers'
import { Rating } from 'react-simple-star-rating'
import ordersAPI from '../../api/ordersAPI'
import { useToasts } from 'react-toast-notifications'

const CustomerPage = () => {
  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const id = useSelector((state) => state.auth.currentUser.customerId)
  const currency = 'USD'

  const { addToast } = useToasts()

  useEffect(() => {
    ordersAPI
      .getOrdersForCustomerById(id)
      .then((orders) => setOrders(orders))
      .then(() => setIsLoading(false))
  }, [orderId])

  const handleRating = async (id, rate) => {
    const setRating = await ordersAPI.setRating(id, Number(rate))
    if (!setRating) {
      addToast('Rating cannot be set', {
        transitionState: 'entered',
        appearance: 'error'
      })
    } else {
      addToast('Rating has been set', {
        transitionState: 'entered',
        appearance: 'success'
      })
      setOrderId(id)
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
                <MySpan>Order price: {formatValueToDecimal(order.price)} {currency}</MySpan>
                <MySpan>Order status: {order.status}</MySpan>
                {order.status === 'Completed' && (
                  <MySpan style={{ position: 'relative' }}>
                    Order rating:{' '}
                    {order.rating ? (
                      order.rating
                    ) : (
                      <Rating
                        style={{ disabled: 'true', position: 'absolute', bottom: '-3px' }}
                        size={20}
                        fillColor='lightsalmon'
                        onClick={(rate) => handleRating(order.id, rate)}
                      />
                    )}
                  </MySpan>
                )}
              </div>
            </li>
          )
        })
      )}
    </div>
  )
}

export default CustomerPage
