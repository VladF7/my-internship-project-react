import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import citiesAPI from '../../../api/citiesAPI'
import clocksAPI from '../../../api/clocksAPI'
import mastersAPI from '../../../api/mastersAPI'
import ordersAPI from '../../../api/ordersAPI'
import MyBigButton from '../../../components/Buttons/BigButton/MyBigButton'
import MyLabel from '../../../components/Label/MyLabel'
import MySpan from '../../../components/Span/MySpan'
import { formatValueToDecimal } from '../../../helpers'

const ConfirmOrder = () => {
  const email = JSON.parse(sessionStorage.getItem('email'))
  const name = JSON.parse(sessionStorage.getItem('name'))
  const clockId = JSON.parse(sessionStorage.getItem('clockId'))
  const cityId = JSON.parse(sessionStorage.getItem('cityId'))
  const masterId = JSON.parse(sessionStorage.getItem('masterId'))
  const priceForHour = JSON.parse(sessionStorage.getItem('priceForHour'))
  const price = JSON.parse(sessionStorage.getItem('price'))
  const startTime = JSON.parse(sessionStorage.getItem('startTime'))
  const endTime = JSON.parse(sessionStorage.getItem('endTime'))

  const [isLoading, setIsLoading] = useState(true)
  const [city, setCity] = useState('')
  const [clock, setClock] = useState('')
  const [master, setMaster] = useState('')
  const currency = 'USD'

  const navigate = useNavigate()
  useEffect(() => {
    Promise.all([
      citiesAPI.getCityById(cityId),
      clocksAPI.getClockById(clockId),
      mastersAPI.getMasterById(masterId)
    ])
      .then((result) => {
        const [city, clock, master] = result
        setCity(city)
        setClock(clock)
        setMaster(master)
      })
      .then(() => setIsLoading(false))
  }, [])

  const goBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const order = await ordersAPI.addOrder(masterId)
    if (order) {
      navigate('/successOrder', { replace: true })
    }
  }

  return (
    <div className='userPage'>
      <form className='userForm' onSubmit={(e) => onSubmit(e)}>
        <div className='content'>
          <MyLabel>Сheck the order information and confirm it:</MyLabel>
          {isLoading ? (
            <MySpan>Data is loading, please wait...</MySpan>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <MySpan>Email: {email},</MySpan>
              <MySpan>Name: {name},</MySpan>
              <MySpan>City: {city.name},</MySpan>
              <MySpan>
                Price for hour: {formatValueToDecimal(priceForHour)} {currency},
              </MySpan>
              <MySpan>Clock size: {clock.size},</MySpan>
              <MySpan>
                Time to fix: {clock.timeToFix} {clock.timeToFix > 1 ? 'hours' : 'hour'},
              </MySpan>
              <MySpan>Master name: {master.name},</MySpan>
              <MySpan>Start time: {startTime},</MySpan>
              <MySpan>End time: {endTime},</MySpan>
              <MySpan>
                Total price: {formatValueToDecimal(price)} {currency}
              </MySpan>
            </div>
          )}
        </div>
        <div className='buttonBoxWrapper'>
          <div className='buttonBox'>
            <MyBigButton onClick={(e) => goBack(e)} className='backBigButton'>
              Back
            </MyBigButton>
          </div>
          <div className='buttonBox'>
            <MyBigButton>Create order</MyBigButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ConfirmOrder
