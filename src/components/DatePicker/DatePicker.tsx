import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'
import { setHours, setMinutes } from 'date-fns'
import { ForwardRefRenderFunction, forwardRef } from 'react'
import React from 'react'

interface IProps {
  value: Date | string
  onChange: (date: Date) => void
  className: string
}

const DatePicker: ForwardRefRenderFunction<unknown, IProps> = (
  { value, onChange, className, ...props },
  ref
) => {
  const changeValue = (date: Date) => {
    if (date < new Date()) {
      onChange(setHours(setMinutes(new Date(), 0), new Date().getHours() + 1))
    } else {
      onChange(date)
    }
  }
  const filterPassedTime = (time: Date) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)
    return currentDate.getTime() < selectedDate.getTime()
  }

  return (
    <div className='datePickerWrapper'>
      <ReactDatePicker
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={className}
        autoComplete='false'
        timeFormat='HH:mm'
        dateFormat='yyyy.MM.dd, HH:00'
        placeholderText='Choose time and date'
        selected={value as Date}
        onChange={(e: Date) => changeValue(e)}
        showTimeSelect
        timeIntervals={60}
        onKeyDown={(e) => e.preventDefault()}
        minDate={new Date()}
        filterTime={filterPassedTime}
      />
    </div>
  )
}

export default forwardRef(DatePicker)
