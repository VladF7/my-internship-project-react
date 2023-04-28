import { useEffect, useState } from 'react'
import ordersAPI from '../../../api/ordersAPI'
import './Orders.css'
import MySpan from '../../../components/Span/MySpan'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { formatValueToDecimal } from '../../../helpers'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import ThreeDotsMenu from '../../../components/ThreeDotsMenu/ThreeDotsMenu'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { addToast } = useToasts()
  const currency = 'USD'

  useEffect(() => {
    ordersAPI
      .getOrders()
      .then((orders) => setOrders(orders))
      .then(() => setIsLoading(false))
  }, [])
  const deleteOrder = async (id) => {
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
                      <MySpan>
                        Order price: {formatValueToDecimal(order.price)} {currency}
                      </MySpan>
                      <MySpan>Order status: {order.status}</MySpan>
                    </div>
                    <div className='buttons'>
                      <ThreeDotsMenu
                        elements={[
                          {
                            iconType: <FiEdit color='lightsalmon' />,
                            action: () => goToEdit(order.id, order.startTime),
                            label: 'Edit order',
                            hidden:
                              format(new Date(), 'yyyy.MM.dd, HH:mm') < order.startTime
                                ? false
                                : true,
                            disabled: false
                          },
                          {
                            iconType: <RiDeleteBin5Line color='red' />,
                            action: () => deleteOrder(order.id),
                            label: 'Delete',
                            hidden: false,
                            disabled: false
                          }
                        ]}
                      />
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
