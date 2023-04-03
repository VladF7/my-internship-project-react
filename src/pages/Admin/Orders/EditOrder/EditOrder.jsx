import { format, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import mastersAPI from '../../../../api/mastersAPI'
import ordersAPI from '../../../../api/ordersAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import DatePicker from '../../../../components/DatePicker/DatePicker'
import MySelect from '../../../../components/Select/MySelect'
import MySpan from '../../../../components/Span/MySpan'

const EditOrder = () => {
  const [isLoading, setIsLoadnig] = useState(true)
  const [cities, setCities] = useState([])
  const [masters, setMasters] = useState([])
  const [master, setMaster] = useState('')
  const [size, setSize] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [endTime, setEndTime] = useState('')

  const [cityError, setCityError] = useState('')
  const [masterError, setMasterError] = useState('')

  const requiredField = 'Поле обязательное для заполнения'
  const sizeOptions = [
    { value: 1, label: 'Маленькие' },
    { value: 2, label: 'Средние' },
    { value: 3, label: 'Большие' }
  ]
  const mastersOptions = masters.map((master) => {
    return { value: master.id, label: `Имя: ${master.name}, рейтинг: ${master.rating}` }
  })
  const citiesOptionsList = cities.map((city) => {
    return { value: city.id, label: city.name }
  })
  const prevPage = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    ordersAPI
      .getOrderById(id)
      .then((order) => {
        setCity(order.cityId)
        setSize(order.clockId)
        setDate(parse(order.startTime, 'yyyy.MM.dd, HH:mm', new Date()))
        setEndTime(order.endTime)
        setMaster(order.masterId)
      })
      .then(() => setIsLoadnig(false))
    citiesAPI.getCities().then((cities) => setCities(cities))
  }, [id])
  useEffect(() => {
    if (!isLoading) {
      getEndOrderTime(date, size)
    }
  }, [size, date])
  useEffect(() => {
    if (!isLoading) {
      getFreeMastersList(id, city, date, endTime)
    }
  }, [endTime, city])
  const getFreeMastersList = async (id, city, startTime, endTime) => {
    const requestData = {
      cityId: city,
      startTime: format(new Date(startTime), 'yyyy.MM.dd, HH:mm'),
      endTime: endTime
    }
    const masters = await mastersAPI.getFreeMastersForCurrOrder(id, requestData)
    setMasters(masters)
    return masters
  }
  const getEndOrderTime = async (startTime, size) => {
    const requestData = {
      clockId: size,
      startTime: format(new Date(startTime), 'yyyy.MM.dd, HH:mm')
    }
    const endTime = await ordersAPI.getOrderEndDate(requestData)
    setEndTime(endTime)
    return endTime
  }
  const changeCity = async (cityId) => {
    setCityError('')
    setCity(Number(cityId))
  }
  const changeSize = (clockId) => {
    setSize(Number(clockId))
  }
  const changeMaster = (masterId) => {
    setMaster(Number(masterId))
    setMasterError('')
  }
  const changeDate = (date) => {
    setDate(date)
  }
  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }
  const editOrder = async (e) => {
    e.preventDefault()
    if (!city || masters.length === 0) {
      if (!city) {
        setCityError(requiredField)
      }
      if (masters.length === 0) {
        setMasterError(requiredField)
      }
      return
    }
    const master = Number(e.target.master.value)
    const startTime = e.target.date.value
    await ordersAPI.editOrder(id, city, master, size, startTime, endTime)
    prevPage(-1)
    await ordersAPI.getOrders()
  }
  if (isLoading) {
    return <MySpan>Данные загружаються, подождите...</MySpan>
  }

  return (
    <form onSubmit={(e) => editOrder(e)} className={'form'}>
      <MySelect
        name='city'
        value={city}
        options={citiesOptionsList}
        placeholder={'Кликните для выбора города'}
        discription={'Выберите ваш город'}
        error={cityError}
        onChange={(e) => changeCity(e.target.value)}
      />
      <DatePicker name='date' value={date} onChange={(date) => changeDate(date)} />
      <MySelect
        options={sizeOptions}
        placeholder='Кликните для выбора размера'
        name='size'
        discription={'Выберите размер часов'}
        value={size}
        onChange={(e) => {
          changeSize(e.target.value)
        }}
      />
      <MySelect
        options={mastersOptions}
        placeholder='Кликните для выбора мастера'
        name='master'
        discription={'Выберите мастера'}
        error={masterError}
        value={master}
        onChange={(e) => changeMaster(e.target.value)}
      />
      <div className='myButtonWrapper'>
        <MyBigButton>Изменить заказ</MyBigButton>
      </div>
      <div className='myButtonWrapper'>
        <MyBigButton onClick={(e) => goBack(e)}>Отменить</MyBigButton>
      </div>
    </form>
  )
}

export default EditOrder
