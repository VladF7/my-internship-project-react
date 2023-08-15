import { FC, useEffect, useState } from 'react'
import './Orders.css'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { formatValueToDecimal } from '../../../helpers'
import AdminNavBar from '../../../components/NavBar/AdminNavBar/AdminNavBar'
import { useToasts } from 'react-toast-notifications'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { deleteOrderThunk, getOrdersThunk } from '../../../store/orders/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu'
import MyTable, { ITableColumn } from '../../../components/Table/MyTable'
import OrdersFiltersForm from '../../../components/ReactHookForms/Filters/OrdersFiltersForm'
import { Box, Modal } from '@mui/material'
import ImageSlider from '../../../components/ImagesSlider/ImageSlider'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import ordersAPI from '../../../api/ordersAPI'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import React from 'react'
import { IImage, IOrdersFilterForm } from '../../../types/order.types'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgba(248,248,255, 0.65)',
  boxShadow: 24,
  borderRadius: '5px',
  p: '15px'
}

const Orders: FC = () => {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState<'desc' | 'asc'>('desc')
  const [sortBy, setSortBy] = useState('id')
  const [filtersFields, setFiltersFields] = useState<IOrdersFilterForm>({
    cities: [],
    masters: [],
    status: '',
    minMaxDate: [],
    minMaxPrice: []
  })
  const [open, setOpen] = useState(false)
  const [sliderImages, setSliderImages] = useState<IImage[]>([])

  const rowsPerPageOptions = [10, 25, 50]
  const labelRowsPerPage = 'Orders per page'
  const currency = 'USD'

  const { timezoneOffset } = useAppSelector((state) => state.timezone)
  const { orders, count, isLoading } = useAppSelector((state) => state.orders)
  useEffect(() => {
    dispatch(getOrdersThunk({ page, limit, sort, sortBy, filtersFields, timezoneOffset }))
  }, [page, limit, sort, sortBy, filtersFields])

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const applyFilters = (filtersFields: IOrdersFilterForm) => {
    setFiltersFields(filtersFields)
    setPage(0)
  }

  const deleteOrder = async (id: number) => {
    const deletedOrder = await dispatch(deleteOrderThunk(id))
    if (isFulfilled(deletedOrder)) {
      dispatch(getOrdersThunk({ page, limit, sort, sortBy, filtersFields, timezoneOffset }))

      addToast('Order has been deleted', { transitionState: 'entered', appearance: 'success' })
    } else if (isRejected(deletedOrder)) {
      addToast('Order cannot be deleted', { transitionState: 'entered', appearance: 'error' })
    }
  }
  const getOrdersTableData = async (
    sort: string,
    sortBy: string,
    filtersFields: IOrdersFilterForm,
    timezoneOffset: number
  ) => {
    try {
      const tableData = await ordersAPI.getOrders({
        page: 0,
        limit: count,
        sort,
        sortBy,
        filtersFields,
        timezoneOffset
      })
      const customHeadings = tableData.rows.map((order) => ({
        'Order ID': order.id,
        'Customer name': order.customer.name,
        Email: order.customer.email,
        'Clock size': order.clock.size,
        'Time to fix': order.clock.timeToFix,
        'Master name': order.master.name,
        City: order.city.name,
        'Start time': order.startTime as string,
        'End time': order.endTime,
        Status: order.status,
        Price: order.price
      }))
      return customHeadings
    } catch (error) {
      addToast('Table cannot be exported', { transitionState: 'entered', appearance: 'error' })
    }
  }

  const goToEdit = (id: number, start: string) => {
    if (format(new Date(), 'yyyy.MM.dd, HH:mm') > start) {
      addToast('Cannot be edited, this order has already been started', {
        transitionState: 'entered',
        appearance: 'error'
      })
    } else {
      navigate(`${id}`)
    }
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const showImageSlider = (images: IImage[]) => {
    setSliderImages(images)
    handleOpen()
  }

  const createData = (
    id: number,
    name: string,
    email: string,
    clock: string,
    timeToFix: number,
    masterName: string,
    city: string,
    startTime: string,
    endTime: string,
    price: number,
    status: string,
    images: IImage[]
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
              iconType: <MdOutlinePhotoSizeSelectActual color='rgba(35, 43, 85)' />,
              action: () => showImageSlider(images),
              label: 'Show preview',
              hidden: !images?.length ? true : false,
              disabled: false
            },
            {
              iconType: <FiEdit color='rgba(35, 43, 85)' />,
              action: () => goToEdit(id, startTime as string),
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
  const columns: ITableColumn[] = [
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
      order.startTime as string,
      order.endTime,
      order.price,
      order.status,
      order.images
    )
  )

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={modalStyle}>
            <ImageSlider images={sliderImages} />
          </Box>
        </Modal>

        <MyTable
          columns={columns}
          rows={rows}
          count={count}
          isLoading={isLoading}
          page={page}
          rowsPerPage={limit}
          setPage={setPage}
          setRowsPerPage={setLimit}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage={labelRowsPerPage}
          order={sort}
          orderBy={sortBy}
          setOrder={setSort}
          setOrderBy={setSortBy}
          filtersForm={<OrdersFiltersForm onSubmit={applyFilters} />}
          getExportTableData={() => getOrdersTableData(sort, sortBy, filtersFields, timezoneOffset)}
          exportFileName={'Orders'}
        />
      </div>
    </div>
  )
}

export default Orders
