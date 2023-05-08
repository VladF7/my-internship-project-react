import './MyInput.css'

const MyInput = ({ ...props }) => {
  return <input {...props} className={props.error ? 'myInput' + ' ' + 'errorField' : 'myInput'} />
}

export default MyInput
