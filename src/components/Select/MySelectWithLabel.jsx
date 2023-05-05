import { forwardRef } from 'react'
import MyLabel from '../Label/MyLabel'
import './MySelect.css'
const MySelectWithLabel = (
  {
    name,
    onChange,
    value,
    placeholder,
    options,
    labelText,
    labelValue,
    labelWord,
    error,
    ...props
  },
  ref
) => {
  return (
    <div className='mySelect'>
      <select
        {...props}
        ref={ref}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value))
        }}
        id={name}
        className={error ? 'select' + ' ' + 'errorField' : 'select'}
      >
        <option value={''} disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          )
        })}
      </select>
      <MyLabel
        style={{
          position: 'absolute',
          top: '-25px',
          right: '15px',
          visibility: labelValue ? '' : 'hidden'
        }}
      >
        {labelText} {labelValue} {labelWord}
      </MyLabel>
    </div>
  )
}

export default forwardRef(MySelectWithLabel)
