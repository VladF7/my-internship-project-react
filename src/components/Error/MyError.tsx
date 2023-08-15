import React, { ReactNode } from 'react'
import './MyError.css'

interface IProps {
  children: ReactNode
}

const MyError: React.FC<IProps> = ({ children }) => {
  return <div className={'myError'}>{children}</div>
}

export default MyError
