import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
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

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<UserPage/>}/>
      <Route path='chooseMaster' element={<ChooseMasterForm />}/>
      {/* <Route path='adminAuth' element={}></Route> */}
      <Route path='admin' element={<AdminPage/>}>
          <Route path='orders' element={<Orders/>}></Route>
          <Route path='cities' element={<Cities/>}></Route>
          <Route path='masters' element={<Masters/>}></Route>
          <Route path='masters/:id' element={<EditMaster/>}></Route>
          <Route path='masters/addMaster' element={<AddMaster/>}></Route>
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
