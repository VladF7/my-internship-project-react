import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate} from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import UserPage from './pages/User/UserPage';
import AdminPage from './pages/Admin/AdminPage';
import ChooseMasterForm from './pages/User/ChooseMasterForm/ChooseMasterForm';
import Orders from './pages/Admin/Orders/Orders';
import Cities from './pages/Admin/Cities/Cities';
import Masters from './pages/Admin/Masters/Masters';
import AddMaster from './pages/Admin/Masters/AddMaster.jsx/AddMaster';
import EditMaster from './pages/Admin/Masters/EditMaster/EditMaster';
import SuccessOrder from './pages/User/SuccessOrder/SuccessOrder';
import Customers from './pages/Admin/Customers/Customers';
import EditCustomer from './pages/Admin/Customers/EditCustomer/EditCustomer';
import EditOrder from './pages/Admin/Orders/EditOrder/EditOrder';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<UserPage/>}/>
      <Route path='chooseMaster' element={<ChooseMasterForm />}/>
      <Route path='successOrder' element={<SuccessOrder/>}/>
      {/* <Route path='adminAuth' element={}></Route> */}
      <Route path='admin' element={<AdminPage/>}>
          <Route path="/admin" element={<Navigate to="masters" replace />}/>
          <Route path='masters' element={<Masters/>}></Route>
          <Route path='masters/:id' element={<EditMaster/>}></Route>
          <Route path='masters/addMaster' element={<AddMaster/>}></Route>
          <Route path='cities' element={<Cities/>}></Route>
          <Route path='orders' element={<Orders/>}></Route>
          <Route path='orders/:id' element={<EditOrder/>}></Route>
          <Route path='customers' element={<Customers/>}></Route>
          <Route path='customers/:id' element={<EditCustomer/>}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />}/>
    </Route>
  ))
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
