import { ReactNode } from 'react'
import './MyBigButton.css'
import React from 'react'

interface IProps {
  className?: string
  children: ReactNode
  disabled?: boolean
  style?: object
  onClick?: (event: React.SyntheticEvent<EventTarget>) => void
}

const MyBigButton: React.FC<IProps> = ({ children, className, style, ...props }) => {
  return (
    <button {...props} style={style} className={className ? className : 'bigButton'}>
      {children}
    </button>
  )
}

export default MyBigButton
