import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import UserForm from './pages/UserForm/UserForm';
import AdminForm from './pages/AdminForm/AdminForm';
import ChooseMasterForm from './pages/ChooseMasterForm/ChooseMasterForm';
import Orders from './pages/Orders/Orders';
import Cities from './pages/Cities/Cities';
import Masters from './pages/Masters/Masters';
import { useEffect, useState } from 'react';

function App() {
  const [cities, setCities] = useState([])

  if(!cities){
    setCities ([{id: '1', city: 'Днепр'},{id: '2', city: 'Ужгород'}])
  }

  useEffect(()=>{
    getCities('/api/cities')
  },[])

  async function getCities(url){
    const response = await request(url)
    setCities(response) 
  }
  async function addCity(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const newCity = {
        city: formData.get('city'),
    }
    const response = await request('/api/cities', 'POST', newCity) 
    setCities([...cities, ...response])
  }
  async function delCity(e){
    const id = e.target.id
    await request(`/api/cities/${id}`, 'DELETE') 
    await getCities('/api/cities')
  }

  async function request(url, method = 'GET', data = null){
    try {
        const headers = {}
        let body 
        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(url, {
            method,
            headers,
            body,
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message);
    }
}

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<UserForm cities={cities} />}/>
      <Route path='chooseMaster' element={<ChooseMasterForm />}/>
      {/* <Route path='adminAuth' element={}></Route> */}
      <Route path='adminForm' element={<AdminForm  />}>
        <Route path='orders' element={<Orders/>}></Route>
        <Route path='cities' element={<Cities delCity={delCity} addCity={addCity} cities={cities}/>}></Route>
        <Route path='masters' element={<Masters/>}></Route>
      </Route>
    </Route>
  ))
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
