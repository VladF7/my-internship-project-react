import MyError from '../Error/MyError'
import MyLabel from '../Label/MyLabel'
import './MySelect.css'
const MySelect = ({ discription, name, placeholder, options, ...props }) => {
  return (
    <div className='mySelect'>
      <MyLabel discription={discription}></MyLabel>
      <MyError>{props.error}</MyError>
      <select
        {...props}
        name={name}
        id={name}
        className={props.error ? 'select' + ' ' + 'errorField' : 'select'}
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

export default MySelect
