import { NavLink } from 'react-router-dom'
import '../NavBar.css'

const AdminNavBar = ({ props }) => {
  const items = [
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Masters', path: '/admin/masters' },
    { name: 'Cities', path: '/admin/cities' },
    { name: 'Customers', path: '/admin/customers' },
    { name: 'Statistics', path: '/admin/statistics' }
  ]
  return (
    <nav>
      <ul className={'navList'} {...props}>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <NavLink onClick={item.onClick} to={item.path} className={'link'}>
                {item.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AdminNavBar
