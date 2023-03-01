
let baseURL

if(process.env.NODE_ENV === 'development'){
    baseURL = 'http://localhost:5000'
} else {
    baseURL = 'https://internship-backend.onrender.com'
}

export const request = async (url, method = 'GET', data = null, token = null) => {
    try {
        const headers = {}
        let body 
        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        if(headers){
            headers['Autorization'] = `Bearer ${token}`
        }
        const response = await fetch(
            baseURL + url, {
            method,
            headers,
            body,
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message);
    }
  }
