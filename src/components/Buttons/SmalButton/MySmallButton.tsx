import { Link } from 'react-router-dom'
import './MySmallButton.css'
import React, { ReactNode } from 'react'

interface IProps {
  className?: string
  children: ReactNode
  to?: string
}

const MySmallButton: React.FC<IProps> = ({ children, to, className, ...props }) => {
  return to ? (
    <Link to={to}>
      <button {...props} className={className ? className : 'smallButton'}>
        {children}
      </button>
    </Link>
  ) : (
    <button {...props} className={className ? className : 'smallButton'}>
      {children}
    </button>
  )
}

export default MySmallButton
