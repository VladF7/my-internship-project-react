import MyError from '../Error/MyError'
import MyInput from '../Input/MyInput'
import MyLabel from '../Label/MyLabel'
import './MyDatePicker.css'

const MyDatePicker = ({ ...props }) => {
  return (
    <div className={'datePicker'}>
      <MyError>{props.error}</MyError>
      <MyLabel htmlFor='data' discription='Выберите время и дату' />
      <MyInput id='data' type='datetime-local' name='date' step='3600' {...props} />
    </div>
  )
}

export default MyDatePicker
