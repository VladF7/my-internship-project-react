import { useEffect, useState } from 'react'
import './Orders.css'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { formatValueToDecimal } from '../../../helpers'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderThunk, getOrdersThunk } from '../../../store/orders/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu'
import MyTable from '../../../components/Table/MyTable'

const Orders = () => {
  const [page, setPage] = useState(0)
  const [ordersPerPage, setOrdersPerPage] = useState(10)
  const rowsPerPageOptions = [10, 25, 50]
  const labelRowsPerPage = 'Orders per page'

  const { orders, count, isLoading } = useSelector((state) => state.orders)
  const currency = 'USD'

  useEffect(() => {
    dispatch(getOrdersThunk({ page, ordersPerPage }))
  }, [page, ordersPerPage])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const deleteOrder = async (id) => {
    const deletedOrder = await dispatch(deleteOrderThunk(id))
    if (isFulfilled(deletedOrder)) {
      dispatch(getOrdersThunk({ page, ordersPerPage }))

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

  const createData = (
    id,
    name,
    email,
    clock,
    timeToFix,
    masterName,
    city,
    startTime,
    endTime,
    price,
    status
  ) => {
    return {
      id,
      name,
      email,
      clock,
      timeToFix,
      masterName,
      city,
      startTime,
      endTime,
      price: formatValueToDecimal(price),
      status,
      actions: (
        <DropDownMenu
          elements={[
            {
              iconType: <FiEdit color='lightsalmon' />,
              action: () => goToEdit(id, startTime),
              label: 'Edit order',
              hidden: format(new Date(), 'yyyy.MM.dd, HH:mm') < startTime ? false : true,
              disabled: false
            },
            {
              iconType: <RiDeleteBin5Line color='red' />,
              action: () => deleteOrder(id),
              label: 'Delete',
              hidden: false,
              disabled: false
            }
          ]}
        />
      )
    }
  }
  const columns = [
    { id: 'id', label: 'Order ID', width: '5%', align: 'center' },
    { id: 'name', label: 'Customer name', width: '10%', align: 'center' },
    { id: 'email', label: 'Email', width: '10%', align: 'center' },
    { id: 'clock', label: 'Clock size', width: '7%', align: 'center' },
    { id: 'timeToFix', label: 'Time to fix', width: '8.5%', align: 'center' },
    { id: 'masterName', label: 'Master name', width: '10%', align: 'center' },
    { id: 'city', label: 'City', width: '8.5%', align: 'center' },
    { id: 'startTime', label: 'Start time', width: '10%', align: 'center' },
    { id: 'endTime', label: 'End time', width: '10%', align: 'center' },
    { id: 'price', label: `Price, ${currency}`, width: '8%', align: 'center' },
    { id: 'status', label: 'Status', width: '8%', align: 'center' },
    { id: 'actions', label: 'Actions', width: '5%', align: 'center' }
  ]
  const rows = orders.map((order) =>
    createData(
      order.id,
      order.customer.name,
      order.customer.email,
      order.clock.size,
      order.clock.timeToFix,
      order.master.name,
      order.city.name,
      order.startTime,
      order.endTime,
      order.price,
      order.status
    )
  )

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <MyTable
          columns={columns}
          rows={rows}
          count={count}
          isLoading={isLoading}
          page={page}
          rowsPerPage={ordersPerPage}
          setPage={setPage}
          setRowsPerPage={setOrdersPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage={labelRowsPerPage}
        />
      </div>
    </div>
  )
}

export default Orders
