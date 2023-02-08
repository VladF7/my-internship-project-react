import { request } from "../api/requestAPI";

export const getOrders = async() => {
    const response = await request('/api/orders')
    return response
  }

export const addOrder = async(e) => {
    const formData = new FormData(e.target)
    const newOrder = {
        name: formData.get('name'),
        email: formData.get('email'),
        size: formData.get('city'),
        city: formData.get('city'),
        startDate: formData.get('date'),
    }
    const response = await request('/api/orders', 'POST', newOrder) 
    return response
  }

export const delOrder = async(e) => {
    const id = e.target.id
    const response = await request(`/api/orders/${id}`, 'DELETE') 
    return response
  }


