import { NavLink } from 'react-router-dom'
import './NavBar.css'
import React from 'react'

interface IProps {
  items: {
    name: string
    path: string
  }[]
}

const NavBar: React.FC<IProps> = ({ items }) => {
  return (
    <nav>
      <ul className={'navList'}>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <NavLink to={item.path} className={'link'}>
                {item.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar
