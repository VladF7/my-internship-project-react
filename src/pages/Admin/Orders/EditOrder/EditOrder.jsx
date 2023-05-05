import { parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ordersAPI from '../../../../api/ordersAPI'
import MySpan from '../../../../components/Span/MySpan'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'
import EditOrderForm from '../../../../components/ReactHookForms/EditOrder/EditOrderForm'

const EditOrder = () => {
  const [isLoading, setIsLoadnig] = useState(true)
  const [masterId, setMasterId] = useState('')
  const [clockId, setClockId] = useState('')
  const [cityId, setCityId] = useState('')
  const [date, setDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [status, setStatus] = useState()

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
      })
      .then(() => setIsLoadnig(false))
  }, [id])

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    const editedOrder = await ordersAPI.editOrder(id, formData)
    if (!editedOrder) {
      return
    }
    await ordersAPI.getOrders()
    navigate('/admin/orders')
  }
  if (isLoading) {
    return (
      <div className='adminPage'>
        <div className={'navBar'}>
          <AdminNavBar />
        </div>
        <div className='adminItem'>
          <MySpan>Data is loading, please wait...</MySpan>
        </div>
      </div>
    )
  }

  return (
    <div className='adminPage'>
      <div className={'navBar'}>
        <AdminNavBar />
      </div>
      <div className='adminItem'>
        <EditOrderForm
          formFields={{ cityId, clockId, masterId, date, status }}
          currentOrderInfo={{ id, endTime, currentPrice }}
          onSubmit={onSubmit}
        ></EditOrderForm>
      </div>
    </div>
  )
}

export default EditOrder
