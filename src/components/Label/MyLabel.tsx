import React from 'react'
import './MyLabel.css'

interface IProps {
  children: string
  style?: object
}

const MyLabel: React.FC<IProps> = ({ children, style }) => {
  return (
    <label className={'myLabel'} style={style}>
      {children}
    </label>
  )
}

export default MyLabel
