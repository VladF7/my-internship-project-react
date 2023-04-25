import { format, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import citiesAPI from '../../../../api/citiesAPI'
import clocksAPI from '../../../../api/clocksAPI'
import mastersAPI from '../../../../api/mastersAPI'
import ordersAPI from '../../../../api/ordersAPI'
import MyBigButton from '../../../../components/Buttons/BigButton/MyBigButton'
import DatePicker from '../../../../components/DatePicker/DatePicker'
import MyLabel from '../../../../components/Label/MyLabel'
import MySelect from '../../../../components/Select/MySelect'
import MySpan from '../../../../components/Span/MySpan'
import MySelectWithLabel from '../../../../components/Select/MySelectWithLabel'
import statusesAPI from '../../../../api/statuses.API'
import { formatValueToDecimal } from '../../../../helpers'
import AdminNavBar from '../../../../components/NavBar/AdminNavBar/AdminNavBar'

const EditOrder = () => {
  const [isLoading, setIsLoadnig] = useState(true)
  const [cities, setCities] = useState([])
  const [clocks, setClocks] = useState([])
  const [masters, setMasters] = useState([])
  const [statuses, setStatuses] = useState([])
  const [master, setMaster] = useState('')
  const [clock, setClock] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [priceForHour, setPriceForHour] = useState('')
  const [timeToFix, setTimeToFix] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState()

  const [masterError, setMasterError] = useState('')

  const currency = 'USD'
  const requiredField = 'Required field'
  const sizeOptions = clocks.map((clock) => {
    return { id: clock.id, name: clock.size }
  })
  const mastersOptions = masters.map((master) => {
    return {
      id: master.id,
      label: `Name: ${master.name}, rating: ${master.rating ? master.rating : '0.0'}`
    }
  })
  const statusesOptions = statuses.map((status) => {
    return { id: status, label: status }
  })
  const prevPage = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    Promise.all([
      clocksAPI.getClocks(),
      citiesAPI.getCities(),
      statusesAPI.getStatuses(),
      ordersAPI.getOrderById(id)
    ])
      .then((result) => {
        const [clocks, cities, statuses, order] = result
        setClocks(clocks)
        setCities(cities)
        setStatuses(statuses)
        setCity(order.cityId)
        setClock(order.clockId)
        setDate(parse(order.startTime, 'yyyy.MM.dd, HH:mm', new Date()))
        setEndTime(order.endTime)
        setMaster(order.masterId)
        setStatus(order.status)
      })
      .then(() => setIsLoadnig(false))
  }, [id])

  useEffect(() => {
    if (!isLoading) {
      getOrderEndTime(date, clock)
    }
  }, [clock, date])
  useEffect(() => {
    if (!isLoading) {
      getFreeMastersList(id, city, date, endTime)
    }
  }, [endTime, city])

  useEffect(() => {
    getPriceForHour(city)
  }, [city])
  useEffect(() => {
    getTimeToFix(clock)
  }, [clock])
  useEffect(() => {
    getPrice(timeToFix, priceForHour)
  }, [priceForHour, timeToFix])

  const getPrice = (timeToFix, priceForHour) => {
    const price = timeToFix * priceForHour
    setPrice(price)
  }
  const getPriceForHour = (cityId) => {
    const [city] = cities.filter((c) => c.id === cityId)
    if (city) {
      setPriceForHour(city.priceForHour)
    } else {
      setPriceForHour('')
    }
  }
  const getTimeToFix = (clockId) => {
    const [clock] = clocks.filter((c) => c.id === clockId)
    if (clock) {
      setTimeToFix(clock.timeToFix)
    } else {
      setTimeToFix('')
    }
  }
  const getFreeMastersList = async (id, city, startTime, endTime) => {
    const requestData = {
      cityId: city,
      startTime: format(new Date(startTime), 'yyyy.MM.dd, HH:mm'),
      endTime: endTime
    }
    const masters = await mastersAPI.getFreeMastersForCurrOrder(id, requestData)
    setMasters(masters)
    if (masters.length) {
      setMasterError('')
    } else {
      setMasterError('Тhere are no free masers at the moment')
    }
    return masters
  }
  const getOrderEndTime = async (startTime, size) => {
    const requestData = {
      clockId: size,
      startTime: format(new Date(startTime), 'yyyy.MM.dd, HH:mm')
    }
    const endTime = await ordersAPI.getOrderEndTime(requestData)
    setEndTime(endTime)
    return endTime
  }
  const goBack = (e) => {
    e.preventDefault()
    prevPage(-1)
  }
  const editOrder = async (e) => {
    e.preventDefault()
    if (!masters.length) {
      setMasterError(requiredField)
      return
    }
    const master = Number(e.target.master.value)
    const startTime = e.target.date.value
    const editedOrder = await ordersAPI.editOrder(
      id,
      city,
      master,
      clock,
      startTime,
      endTime,
      priceForHour,
      price,
      status
    )
    if (editedOrder) {
      prevPage(-1)
      await ordersAPI.getOrders()
    }
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
        <form onSubmit={(e) => editOrder(e)} className={'form'}>
          <DatePicker name='date' value={date} onChange={(date) => setDate(date)} />

          <MySelectWithLabel
            options={sizeOptions}
            placeholder='Click to select size'
            name='clock'
            labelText='Time to fix'
            labelValue={timeToFix}
            labelWord={timeToFix > 1 ? 'hours' : 'hour'}
            discription={'Choose clock size'}
            value={clock}
            onChange={(e) => {
              setClock(Number(e.target.value))
            }}
          />
          <MySelectWithLabel
            name='city'
            value={city}
            options={cities}
            labelText='Price for hour'
            labelValue={formatValueToDecimal(priceForHour)}
            labelWord={currency}
            placeholder={'Click to select city'}
            discription={'Choose city'}
            onChange={(e) => setCity(Number(e.target.value))}
          />
          <MyLabel
            style={{
              visibility: price ? '' : 'hidden',
              paddingLeft: '0px',
              justifyContent: 'center'
            }}
          >
            Clock repair will cost {formatValueToDecimal(price)} {currency}
          </MyLabel>

          <MySelect
            options={mastersOptions}
            placeholder='Click to select master'
            name='master'
            discription={'Choose master'}
            error={masterError}
            value={master}
            onFocus={() => setMasterError('')}
            onChange={(e) => setMaster(Number(e.target.value))}
          />
          <MySelect
            options={statusesOptions}
            placeholder='Click to select status'
            name='status'
            discription={'Change status'}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <div className='buttonBoxWrapper'>
            <div className='buttonBox'>
              <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
                Cancel
              </MyBigButton>
            </div>
            <div className='buttonBox'>
              <MyBigButton>Edit order</MyBigButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditOrder
