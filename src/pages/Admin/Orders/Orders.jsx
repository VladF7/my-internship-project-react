import { useEffect, useState } from 'react'
import MySmallButton from '../../../components/Buttons/SmalButton/MySmallButton'
import ordersAPI from '../../../api/ordersAPI'
import './Orders.css'
import MySpan from '../../../components/Span/MySpan'
import { useNavigate } from 'react-router-dom'
import MyError from '../../../components/Error/MyError'
import { format } from 'date-fns'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editError, setEditError] = useState('')
  const [currOrderId, setCurrOrderId] = useState('')
  const navigate = useNavigate()
  const textError = 'Cannot be edited, this order has already been started'

  useEffect(() => {
    ordersAPI
      .getOrders()
      .then((orders) => setOrders(orders))
      .then(() => setIsLoading(false))
  }, [])
  const delOrder = (id) => {
    ordersAPI.delOrder(id)
    setOrders(orders.filter((order) => order.id !== id))
  }

  const formatValueToDecimal = (value) => {
    return (value / 100).toFixed(2)
  }

  const goToEdit = (id, start) => {
    if (format(new Date(), 'yyyy.MM.dd, HH:mm') > start) {
      setEditError(textError)
      setTimeout(() => {
        setEditError('')
      }, 1500)
    } else {
      navigate(`${id}`)
    }
    setCurrOrderId(id)
  }

  if (isLoading === true) return <MySpan>The list of orders is loading...</MySpan>

  return (
    <div className='itemContent'>
      <div className='orders'>
        <ul className='list'>
          {orders.length === 0 ? (
            <MySpan>The list of orders is empty</MySpan>
          ) : (
            orders.map((order) => {
              return (
                <li id={order.id} key={order.id} className='listItem'>
                  {currOrderId === order.id ? <MyError>{editError}</MyError> : ''}
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
                    <MySmallButton onClick={() => delOrder(order.id)} className='smallButtonDelete'>
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
  )
}

export default Orders
