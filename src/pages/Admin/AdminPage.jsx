import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import './AdminPage.css'

const AdminForm = () => {
  const items = [
    { name: 'Orders', path: 'orders' },
    { name: 'Masters', path: 'masters' },
    { name: 'Cities', path: 'cities' },
    { name: 'Customers', path: 'customers' }
  ]
  return (
    <div className={'adminPage'}>
      <div className={'navBar'}>
        <NavBar items={items} />
      </div>
      <div className={'adminItem'}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminForm
