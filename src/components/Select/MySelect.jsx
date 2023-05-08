import { forwardRef } from 'react'
import './MySelect.css'
const MySelect = ({ name, placeholder, options, error, onChange, ...props }, ref) => {
  return (
    <div className='mySelect'>
      <select
        {...props}
        ref={ref}
        name={name}
        id={name}
        onChange={onChange}
        className={error ? 'select' + ' ' + 'errorField' : 'select'}
      >
        <option value={''} disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default forwardRef(MySelect)
