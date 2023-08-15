import { forwardRef } from 'react'
import MyLabel from '../Label/MyLabel'
import './MySelect.css'
import React from 'react'
import { IOption } from '../../types'

interface IProps {
  placeholder: string
  options: IOption[]
  labelText?: string
  labelValue?: string | number
  labelWord?: string
  error: boolean
  value: number | ''
  onChange: (value: number) => void
}

const MySelectWithLabel: React.ForwardRefRenderFunction<unknown, IProps> = (
  { placeholder, options, value, onChange, labelText, labelValue, labelWord, error },
  ref
) => {
  return (
    <div className='mySelect'>
      <select
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={error ? 'select' + ' ' + 'errorField' : 'select'}
      >
        <option value={''} disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
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
        {`${labelText || ''} ${labelValue || ''} ${labelWord || ''}`}
      </MyLabel>
    </div>
  )
}

export default forwardRef(MySelectWithLabel)
