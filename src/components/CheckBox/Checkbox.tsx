import React from 'react'
import './Checkbox.css'

interface IProps {
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: boolean
}
const Checkbox: React.FC<IProps> = ({ label, onChange, value }) => {
  return (
    <div className='checkBoxWrapper'>
      <label className='checkboxLabel' htmlFor='checkbox'>
        {label}
      </label>
      <input
        onChange={onChange}
        checked={value}
        style={{ marginLeft: '8px' }}
        type='checkbox'
      ></input>
    </div>
  )
}

export default Checkbox
