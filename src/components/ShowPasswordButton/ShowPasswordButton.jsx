import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import './ShowPasswordButton.css'
const ShowPasswordButton = ({ value, setValue, ...props }) => {
  const clickHandler = (e) => {
    e.preventDefault()
    setValue(!value)
  }
  return (
    <button {...props} className='showPasswordButton' value={value} onClick={clickHandler}>
      {(value && <MdOutlineVisibility size={'1.3em'} />) ||
        (!value && <MdOutlineVisibilityOff size={'1.3em'} />)}
    </button>
  )
}

export default ShowPasswordButton
