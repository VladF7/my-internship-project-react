import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import React from 'react'

const Layout: React.FC = () => {
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
