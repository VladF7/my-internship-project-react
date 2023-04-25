import { useEffect, useState } from 'react'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import ordersAPI from '../../../api/ordersAPI'
import './Orders.css'
import MySpan from '../../../components/Span/MySpan'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { formatValueToDecimal } from '../../../helpers'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { addToast } = useToasts()

  useEffect(() => {
    ordersAPI
      .getOrders()
      .then((orders) => setOrders(orders))
      .then(() => setIsLoading(false))
  }, [])
  const delOrder = async (id) => {
    const deletedOrder = await ordersAPI.delOrder(id)
    if (!deletedOrder) {
      addToast('Order cannot be deleted', { transitionState: 'entered', appearance: 'error' })
      return
    }
    setOrders(orders.filter((order) => order.id !== id))
  }

  const goToEdit = (id, start) => {
    if (format(new Date(), 'yyyy.MM.dd, HH:mm') > start) {
      addToast('Cannot be edited, this order has already been started', {
        transitionState: 'entered',
        appearance: 'error'
      })
    } else {
      navigate(`${id}`)
    }
  }

  if (isLoading === true)
    return (
      <div className='adminPage'>
        <div className={'navBar'}>
          <AdminNavBar />
        </div>
        <div className='adminItem'>
          <MySpan>The list of orders is loading...</MySpan>
        </div>
      </div>
    )

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <div className='orders'>
          <ul className='list'>
            {orders.length === 0 ? (
              <MySpan>The list of orders is empty</MySpan>
            ) : (
              orders.map((order) => {
                return (
                  <li id={order.id} key={order.id} className='listItem'>
                    <div className='itemInfo'>
                      <MySpan>Name: {order.customer.name},</MySpan>
                      <MySpan>Email: {order.customer.email},</MySpan>
                      <MySpan>Clock size: {order.clock.size},</MySpan>
                      <MySpan>Time to fix: {order.clock.timeToFix},</MySpan>
                      <MySpan>Master name: {order.master.name},</MySpan>
                      <MySpan>City: {order.city.name},</MySpan>
                      <MySpan>Order start time: {order.startTime},</MySpan>
                      <MySpan>Order end time: {order.endTime}</MySpan>
                      <MySpan>Order price: {formatValueToDecimal(order.price)}</MySpan>
                      <MySpan>Order status: {order.status}</MySpan>
                    </div>
                    <div className='buttons'>
                      {format(new Date(), 'yyyy.MM.dd, HH:mm') < order.startTime ? (
                        <MySmallButton onClick={() => goToEdit(order.id, order.startTime)}>
                          Edit
                        </MySmallButton>
                      ) : (
                        ''
                      )}
                      <MySmallButton
                        onClick={() => delOrder(order.id)}
                        className='smallButtonDelete'
                      >
                        Delete
                      </MySmallButton>
                    </div>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Orders
