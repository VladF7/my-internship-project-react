import MyError from '../Error/MyError'
import MyLabel from '../Label/MyLabel'
import './MySizeSelector.css'

const MySizeSelector = ({ error, ...props }) => {
  const options = [
    { value: 'Small', id: 1 },
    { value: 'Medium', id: 2 },
    { value: 'Big', id: 3 }
  ]

  let word
  let time = options.filter((option) => option.id === props.value)

  if (time.length) {
    time = time[0].id
    if (time % 10 === 1) {
      word = 'hour'
    } else {
      word = 'hours'
    }
  } else {
    time = null
  }

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
                {option.value}
              </label>
            </span>
          )
        })}
        <MyLabel
          style={{
            position: 'absolute',
            top: '0',
            right: '15px',
            visibility: time ? '' : 'hidden'
          }}
        >
          Time to fix {time} {word}
        </MyLabel>
      </fieldset>
    </div>
  )
}

export default MySizeSelector
