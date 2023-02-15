export const request = async (url, method = 'GET', data = null) => {
    try {
        const headers = {}
        let body 
        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(
            'https://internship-backend.onrender.com' + url, {
            method,
            headers,
            body,
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message);
    }
  }
