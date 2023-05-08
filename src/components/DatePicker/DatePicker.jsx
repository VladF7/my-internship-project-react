import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'
import { setHours, setMinutes } from 'date-fns'
import { forwardRef } from 'react'

const DatePicker = ({ value, onChange, className, ...props }, ref) => {
  const changeValue = (date) => {
    if (date < new Date()) {
      onChange(setHours(setMinutes(new Date(), 0), new Date().getHours() + 1))
    } else {
      onChange(date)
    }
  }
  const filterPassedTime = (time) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)
    return currentDate.getTime() < selectedDate.getTime()
  }

  return (
    <div className='datePickerWrapper'>
      <ReactDatePicker
        {...props}
        ref={ref}
        className={className}
        autoComplete='false'
        timeFormat='HH:mm'
        dateFormat='yyyy.MM.dd, HH:00'
        placeholderText='Choose time and date'
        selected={value}
        onChange={(e) => changeValue(e)}
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
