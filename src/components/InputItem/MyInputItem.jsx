import MyInput from '../Input/MyInput'
import MyLabel from '../Label/MyLabel'
import './MyInputItem.css'
import RequiredField from '../Error/RequiredField'

const MyInputItem = ({ item, ...props }) => {
  return (
    <div className={'inputItem'}>
      <MyLabel htmlFor={item.id} discription={item.discription}></MyLabel>
      <RequiredField>{props.error}</RequiredField>
      <MyInput
        id={item.id}
        type={item.type}
        placeholder={item.placeholder}
        error={props.error}
        {...props}
      />
    </div>
  )
}

export default MyInputItem
