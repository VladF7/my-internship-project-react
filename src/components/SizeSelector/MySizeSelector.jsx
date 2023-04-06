import MyError from '../Error/MyError'
import MyLabel from '../Label/MyLabel'
import './MySizeSelector.css'

const MySizeSelector = ({ error, options, labelText, labelValue, labelWord, ...props }) => {
  return (
    <div className={'sizeSelector'}>
      <MyError>{error}</MyError>
      <fieldset className={'fieldset'} {...props}>
        <legend className={'legend'}>Choose clock size</legend>
        {options.map((option) => {
          return (
            <span key={option.id} className={'item'}>
              <input
                className={'input'}
                type='radio'
                id={option.id}
                name='size'
                value={option.id}
                defaultChecked={option.id === props.value ? true : false}
              />
              <label className={'label'} htmlFor={option.id}>
                {option.size}
              </label>
            </span>
          )
        })}
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
      </fieldset>
    </div>
  )
}

export default MySizeSelector
