import MyError from '../Error/MyError'
import MyInput from '../Input/MyInput'
import MyLabel from '../Label/MyLabel'
import './MyCitySelector.css'

const MyCitySelector = ({ ...props }) => {
  return (
    <div className={'citySelector'} {...props}>
      <MyLabel htmlFor='city' discription='Выберите город'></MyLabel>
      <MyInput
        name='city'
        id={props.id}
        list='cities'
        placeholder='Введите название города'
        value={props.value}
        onChange={props.onChange}
      />
      <datalist id='cities'>
        {props.cities.map((city) => (
          <option id={city.id} value={city.name} key={city.id}></option>
        ))}
      </datalist>

      <MyError>{props.error}</MyError>
    </div>
  )
}

export default MyCitySelector
