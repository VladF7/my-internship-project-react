import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  children: ReactNode
  to: string
}

const MyLinkButton: React.FC<IProps> = ({ children, to, ...props }) => {
  return (
    <Link to={to}>
      <button {...props} className={'bigButton'}>
        {children}
      </button>
    </Link>
  )
}

export default MyLinkButton
