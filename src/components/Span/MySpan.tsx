import React, { ReactNode } from 'react'
import './MySpan.css'

interface IProps {
  children: ReactNode
  style?: object
}

const MySpan: React.FC<IProps> = ({ children, style }) => {
  return (
    <span style={style} className='mySpan'>
      {children}
    </span>
  )
}

export default MySpan
