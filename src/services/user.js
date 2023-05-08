import ordersAPI from '../api/ordersAPI'

export const saveUserData = async (formData) => {
  const { name, email, clockId, cityId, date, startTime, price, priceForHour, timeToFix } = formData

  const endTime = await ordersAPI.getOrderEndTime(clockId, date)

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
