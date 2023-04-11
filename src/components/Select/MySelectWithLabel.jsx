import MyError from '../Error/MyError'
import MyLabel from '../Label/MyLabel'
import './MySelect.css'
const MySelectWithLabel = ({
  discription,
  name,
  placeholder,
  options,
  labelText,
  labelValue,
  labelWord,
  ...props
}) => {
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
              {option.name}
            </option>
          )
        })}
      </select>
      <MyLabel
        style={{
          position: 'absolute',
          top: '0',
          right: '15px',
          visibility: labelValue ? '' : 'hidden'
        }}
      >
        {labelText} {labelValue} {labelWord}
      </MyLabel>
    </div>
  )
}

export default MySelectWithLabel
