import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import './ShowPasswordButton.css'
import React from 'react'

interface IProps {
  value: boolean
  setValue: (value: boolean) => void
}

const ShowPasswordButton: React.FC<IProps> = ({ value, setValue }) => {
  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setValue(!value)
  }
  return (
    <button className='showPasswordButton' onClick={clickHandler}>
      {(!value && <MdOutlineVisibility size={'1.3em'} />) ||
        (value && <MdOutlineVisibilityOff size={'1.3em'} />)}
    </button>
  )
}

export default ShowPasswordButton
