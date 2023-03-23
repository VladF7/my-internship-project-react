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
  const textError = 'Не может быть изменен, этот заказ уже был начат'

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

  if (isLoading === true) return <MySpan>Список заказов загружается...</MySpan>

  return (
    <div className='itemContent'>
      <div className='orders'>
        <ul className='list'>
          {orders.length === 0 ? (
            <MySpan>Список заказов пуст</MySpan>
          ) : (
            orders.map((order) => {
              return (
                <li id={order.id} key={order.id} className='listItem'>
                  {currOrderId === order.id ? <MyError>{editError}</MyError> : ''}
                  <div className='itemInfo'>
                    <MySpan>Имя: {order.name},</MySpan>
                    <MySpan>Email: {order.email},</MySpan>
                    <MySpan>Pазмер часов: {order.size},</MySpan>
                    <MySpan>Время ремонта: {order.timeToFix},</MySpan>
                    <MySpan>Имя мастера: {order.master},</MySpan>
                    <MySpan>Город: {order.city},</MySpan>
                    <MySpan>Начало заказа: {order.startTime},</MySpan>
                    <MySpan>Конец заказа: {order.endTime}</MySpan>
                  </div>
                  <div className='buttons'>
                    {format(new Date(), 'yyyy.MM.dd, HH:mm') < order.startTime ? (
                      <MySmallButton onClick={() => goToEdit(order.id, order.startTime)}>
                        Изменить
                      </MySmallButton>
                    ) : (
                      ''
                    )}
                    <MySmallButton onClick={() => delOrder(order.id)}>Удалить</MySmallButton>
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
