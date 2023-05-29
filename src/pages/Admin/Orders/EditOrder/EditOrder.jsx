import { parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MySpan from '../../../../components/Span/MySpan'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import EditOrderForm from '../../../../components/ReactHookForms/EditOrder/EditOrderForm'
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import ordersAPI from '../../../../api/ordersAPI'
import { editOrderThunk } from '../../../../store/orders/thunk'
import { isFulfilled, isRejected } from '@reduxjs/toolkit'
import { useToasts } from 'react-toast-notifications'

const EditOrder = () => {
  const [isLoading, setIsLoadnig] = useState(true)
  const [masterId, setMasterId] = useState('')
  const [clockId, setClockId] = useState('')
  const [cityId, setCityId] = useState('')
  const [date, setDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [status, setStatus] = useState()
  const [images, setImages] = useState([])

  const { id } = useParams()

  useEffect(() => {
    ordersAPI
      .getOrderById(id)
      .then((order) => {
        setCityId(order.cityId)
        setClockId(order.clockId)
        setMasterId(order.masterId)
        setDate(parse(order.startTime, 'yyyy.MM.dd, HH:mm', new Date()))
        setEndTime(order.endTime)
        setStatus(order.status)
        setCurrentPrice(order.price)
        order.images ? setImages(order.images.map((image) => image.url)) : setImages(order.images)
      })
      .then(() => setIsLoadnig(false))
  }, [id])

  const { inProcess } = useSelector((state) => state.orders)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const onSubmit = async (formData) => {
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
            currentOrderInfo={{ id, endTime, currentPrice }}
            onSubmit={onSubmit}
            loader={<PulseLoader color='lightsalmon' size='10px' />}
          ></EditOrderForm>
        )}
      </div>
    </div>
  )
}

export default EditOrder
