import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from 'react-router-dom'
import './App.css'

import Layout from './components/Layout/Layout'
import UserPage from './pages/User/UserPage'
import AdminPage from './pages/Admin/AdminPage'
import ChooseMasterForm from './pages/User/ChooseMasterForm/ChooseMasterForm'
import Orders from './pages/Admin/Orders/Orders'
import Cities from './pages/Admin/Cities/Cities'
import Masters from './pages/Admin/Masters/Masters'
import AddMaster from './pages/Admin/Masters/AddMaster/AddMaster'
import EditMaster from './pages/Admin/Masters/EditMaster/EditMaster'
import SuccessOrder from './pages/User/SuccessOrder/SuccessOrder'
import Customers from './pages/Admin/Customers/Customers'
import EditOrder from './pages/Admin/Orders/EditOrder/EditOrder'
import LoginPage from './pages/LoginPage/LoginPage'
import RequireAuth from './hoc/RequireAuth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './services/auth'
import { actionLoaded } from './reducers/loadReducer'
import { ClockLoader } from 'react-spinners'

const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.load.isLoading)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    } else {
      dispatch(actionLoaded())
    }
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<UserPage />} />
        <Route path='chooseMaster' element={<ChooseMasterForm />} />
        <Route path='successOrder' element={<SuccessOrder />} />
        <Route path='auth' element={<LoginPage />} />
        <Route
          path='admin'
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        >
          <Route path='/admin' element={<Navigate to='masters' replace />} />
          <Route path='masters' element={<Masters />} />
          <Route path='masters/:id' element={<EditMaster />}></Route>
          <Route path='masters/addMaster' element={<AddMaster />}></Route>
          <Route path='cities' element={<Cities />} />
          <Route path='orders' element={<Orders />}></Route>
          <Route path='orders/:id' element={<EditOrder />}></Route>
          <Route path='customers' element={<Customers />}></Route>
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    )
  )

  if (isLoading) {
    return (
      <div className='App'>
        <ClockLoader color='lightsalmon' size='150px' />
      </div>
    )
  }

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
