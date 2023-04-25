import ordersAPI from '../api/ordersAPI'

export const saveUserData = async (
  name,
  email,
  clockId,
  cityId,
  startTime,
  price,
  priceForHour,
  timeToFix
) => {
  const requestData = {
    clockId,
    startTime
  }
  const endTime = await ordersAPI.getOrderEndTime(requestData)

  sessionStorage.setItem('name', JSON.stringify(name))
  sessionStorage.setItem('email', JSON.stringify(email))
  sessionStorage.setItem('clockId', JSON.stringify(clockId))
  sessionStorage.setItem('cityId', JSON.stringify(cityId))
  sessionStorage.setItem('startTime', JSON.stringify(startTime))
  sessionStorage.setItem('endTime', JSON.stringify(endTime))
  sessionStorage.setItem('price', JSON.stringify(price))
  sessionStorage.setItem('priceForHour', JSON.stringify(priceForHour))
  sessionStorage.setItem('timeToFix', JSON.stringify(timeToFix))

  return endTime
}
