import { parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MySpan from '../../../../components/Span/MySpan'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import EditOrderForm from '../../../../components/ReactHookForms/EditOrder/EditOrderForm'
import { PulseLoader } from 'react-spinners'
import ordersAPI from '../../../../api/ordersAPI'
import { editOrderThunk } from '../../../../store/orders/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useToasts } from 'react-toast-notifications'
import { ICurrentOrderInfo, IEditOrder } from '../../../../types/order.types'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import React from 'react'

const EditOrder = () => {
  const [isLoading, setIsLoadnig] = useState(true)
  const [masterId, setMasterId] = useState(0)
  const [clockId, setClockId] = useState(0)
  const [cityId, setCityId] = useState(0)
  const [date, setDate] = useState<Date>(new Date())
  const [endTime, setEndTime] = useState('')
  const [currentPrice, setCurrentPrice] = useState(0)
  const [status, setStatus] = useState('')
  const [images, setImages] = useState<string[]>([])

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      ordersAPI
        .getOrderById(id)
        .then((order) => {
          setCityId(order.cityId)
          setClockId(order.clockId)
          setMasterId(order.masterId)
          setDate(parse(order.startTime as string, 'yyyy.MM.dd, HH:mm', new Date()))
          setEndTime(order.endTime)
          setStatus(order.status)
          setCurrentPrice(order.price)
          order.images ? setImages(order.images.map((image) => image.url)) : setImages(order.images)
        })
        .then(() => setIsLoadnig(false))
    }
  }, [id])

  const { inProcess } = useAppSelector((state) => state.orders)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData: IEditOrder) => {
    if (id) {
      const editedOrder = await dispatch(editOrderThunk({ id, formData }))
      if (isFulfilled(editedOrder)) {
        addToast('Order has been edited', {
          transitionState: 'entered',
          appearance: 'success'
        })
        navigate('/admin/orders')
      } else if (isRejected(editedOrder)) {
        addToast('Order cannot be edited', {
          transitionState: 'entered',
          appearance: 'error'
        })
      }
    }
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        {isLoading ? (
          <MySpan>Data is loading, please wait...</MySpan>
        ) : (
          <EditOrderForm
            formFields={{
              cityId,
              clockId,
              masterId,
              date,
              status,
              images
            }}
            inProcess={inProcess}
            currentOrderInfo={{ id, endTime, currentPrice } as ICurrentOrderInfo}
            onSubmit={onSubmit}
            loader={<PulseLoader color='lightsalmon' size='10px' />}
          ></EditOrderForm>
        )}
      </div>
    </div>
  )
}

export default EditOrder
