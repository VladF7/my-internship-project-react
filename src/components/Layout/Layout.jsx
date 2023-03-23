import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

const Layout = () => {
  return (
    <>
      <Header />
      <div className='App-content'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
