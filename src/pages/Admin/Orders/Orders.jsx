import { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderThunk, getOrdersThunk } from '../../../store/orders/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'

const Orders = () => {
  const { orders, isLoading } = useSelector((state) => state.orders)
  const currency = 'USD'

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [])

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const deleteOrder = async (id) => {
    const deletedOrder = await dispatch(deleteOrderThunk(id))
    if (isFulfilled(deletedOrder)) {
      addToast('Order has been deleted', { transitionState: 'entered', appearance: 'success' })
    } else if (isRejected(deletedOrder)) {
      addToast('Order cannot be deleted', { transitionState: 'entered', appearance: 'error' })
    }
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

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        {isLoading ? (
          <MySpan>The list of orders is loading...</MySpan>
        ) : (
          <div className='orders'>
            <ul className='list'>
              {!orders.length ? (
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
        )}
      </div>
    </div>
  )
}

export default Orders
