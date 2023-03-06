import ordersAPI from '../api/ordersAPI'

export const createUser = async (e) => {
  const formData = new FormData(e.target)
  const userForm = {
    name: formData.get('name'),
    email: formData.get('email'),
    size: formData.get('size'),
    city: formData.get('city'),
    start: formData.get('date'),
  }
    sessionStorage.setItem('name', userForm.name)
    sessionStorage.setItem('email', userForm.email)
    sessionStorage.setItem('size', userForm.size)
    sessionStorage.setItem('city', userForm.city)
    sessionStorage.setItem('start', userForm.start)
    const end = await ordersAPI.getOrderEndDate(sessionStorage)
    sessionStorage.setItem('end', end)  
    
    return end
} 
    
