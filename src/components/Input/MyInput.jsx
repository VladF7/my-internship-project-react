import './MyInput.css'

const MyInput = ({ ...props }) => {
  return <input className={props.error ? 'myInput' + ' ' + 'errorField' : 'myInput'} {...props} />
}

export default MyInput
