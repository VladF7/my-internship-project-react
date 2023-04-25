import { useSelector } from 'react-redux'
import './MasterPage.css'
import '../Admin/AdminPage.css'
import { useEffect, useState } from 'react'
import MySpan from '../../components/Span/MySpan'
import { formatValueToDecimal } from '../../helpers'
import MySmallButton from '../../components/Buttons/SmalButton/MySmallButton'
import ordersAPI from '../../api/ordersAPI'
import MyError from '../../components/Error/MyError'

const MasterPage = () => {
  const [orderId, setOrderId] = useState('')
  const [orders, setOrders] = useState([])
  const [changeStatusError, setChangeStatusError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const id = useSelector((state) => state.auth.currentUser.masterId)

  useEffect(() => {
    ordersAPI
      .getOrdersForMastrerById(id)
      .then((orders) => setOrders(orders))
      .then(() => setIsLoading(false))
  }, [orderId])

  const completeOrder = async (id) => {
    const completedOrder = await ordersAPI.completeOrder(id)
    if (!completedOrder) {
      setChangeStatusError("Status can't be changed")
      setTimeout(() => {
        setChangeStatusError('')
      }, 1500)
    }
    setOrderId(id)
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
              {orderId === order.id ? <MyError>{changeStatusError}</MyError> : ''}
              <div className='itemInfo'>
                <MySpan>Name: {order.customer.name},</MySpan>
                <MySpan>Clock size: {order.clock.size},</MySpan>
                <MySpan>Time to fix: {order.clock.timeToFix},</MySpan>
                <MySpan>City: {order.city.name},</MySpan>
                <MySpan>Order start time: {order.startTime},</MySpan>
                <MySpan>Order end time: {order.endTime}</MySpan>
                <MySpan>Order price: {formatValueToDecimal(order.price)}</MySpan>
                <MySpan>Order status: {order.status}</MySpan>
              </div>
              {order.status === 'Confirmed' && (
                <div className='buttons'>
                  <MySmallButton
                    style={{ background: 'green' }}
                    onClick={() => completeOrder(order.id)}
                  >
                    Complete order
                  </MySmallButton>
                </div>
              )}
            </li>
          )
        })
      )}
    </div>
  )
}

export default MasterPage
