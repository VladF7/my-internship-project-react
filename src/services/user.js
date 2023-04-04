import ordersAPI from '../api/ordersAPI'

export const createUser = async (name, email, clockId, cityId, startTime) => {
  const requestData = {
    clockId,
    startTime
  }
  const endTime = await ordersAPI.getOrderEndDate(requestData)

  sessionStorage.setItem('name', JSON.stringify(name))
  sessionStorage.setItem('email', JSON.stringify(email))
  sessionStorage.setItem('clockId', JSON.stringify(clockId))
  sessionStorage.setItem('cityId', JSON.stringify(cityId))
  sessionStorage.setItem('startTime', JSON.stringify(startTime))
  sessionStorage.setItem('endTime', JSON.stringify(endTime))

  return endTime
}
