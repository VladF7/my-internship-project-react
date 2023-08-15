/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'
import './MySelect.css'
import React from 'react'
import { IOption } from '../../types'

interface IProps {
  placeholder: string
  options: IOption[]
  error: boolean
}

const MySelect: React.ForwardRefRenderFunction<unknown, IProps> = (
  { placeholder, options, error },
  ref
) => {
  return (
    <div className='mySelect'>
      <select ref={ref as any} className={error ? 'select' + ' ' + 'errorField' : 'select'}>
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
    </div>
  )
}

export default forwardRef(MySelect)
