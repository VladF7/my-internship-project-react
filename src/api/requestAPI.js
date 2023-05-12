let baseURL

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5000'
} else {
  baseURL = 'https://internship-backend.onrender.com'
}

export const request = async (url, method = 'GET', data = null, token = null) => {
  try {
    const headers = {}
    let body
    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(baseURL + url, {
      method,
      headers,
      body
    })
    if (response.ok) {
      return await response.json()
    } else {
      const res = await response
      throw await res.text()
    }
  } catch (error) {
    console.warn('Error: ' + error)
    throw error
  }
}
