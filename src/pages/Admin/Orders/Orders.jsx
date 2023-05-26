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
import OrdersFiltersForm from '../../../components/ReactHookForms/Filters/OrdersFiltersForm'

const Orders = () => {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState('asc')
  const [sortBy, setSortBy] = useState('id')
  const [filtersFields, setFiltersFields] = useState({
    cities: [],
    masters: [],
    status: '',
    minMaxDate: [],
    minMaxPrice: []
  })

  const rowsPerPageOptions = [10, 25, 50]
  const labelRowsPerPage = 'Orders per page'
  const currency = 'USD'

  const { timezoneOffset } = useSelector((state) => state.timezone)
  const { orders, count, isLoading } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(getOrdersThunk({ page, limit, sort, sortBy, filtersFields, timezoneOffset }))
  }, [page, limit, sort, sortBy, filtersFields])

  useEffect(() => {
    if (count <= limit) {
      setPage(0)
    }
  }, [count])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const applyFilters = (filtersFields) => {
    setFiltersFields(filtersFields)
  }

  const deleteOrder = async (id) => {
    const deletedOrder = await dispatch(deleteOrderThunk(id))
    if (isFulfilled(deletedOrder)) {
      dispatch(getOrdersThunk({ page, limit, sort, sortBy, filtersFields, timezoneOffset }))

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
    { id: 'endTime', label: 'End time', width: '9.5%', align: 'center' },
    { id: 'price', label: `Price, ${currency}`, width: '8%', align: 'center' },
    { id: 'status', label: 'Status', width: '8%', align: 'center' },
    { id: 'actions', label: 'Actions', width: '5%', align: 'center', disableSort: true }
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
          page={count <= limit ? 0 : page}
          rowsPerPage={limit}
          setPage={setPage}
          setRowsPerPage={setLimit}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage={labelRowsPerPage}
          order={sort}
          orderBy={sortBy}
          setOrder={setSort}
          setOrderBy={setSortBy}
          filtersForm={<OrdersFiltersForm filtersFields={filtersFields} onSubmit={applyFilters} />}
        />
      </div>
    </div>
  )
}

export default Orders
