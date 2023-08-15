import React, { ReactNode } from 'react'
import './MyError.css'

interface IProps {
  children: ReactNode
}

const RequiredField: React.FC<IProps> = ({ children }) => {
  return <div className={'requiredField'}>{children}</div>
}

export default RequiredField
