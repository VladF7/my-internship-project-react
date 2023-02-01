import { useState } from 'react';
import MyButton from '../../components/Button/MyButton';
import MyInputItem from '../../components/InputItem/MyInputItem';
import MySizeSelector from '../../components/SizeSelector/MySizeSelector';
import MyCitySelector from '../../components/CitySelector/MyCitySelector';
import classes from './UserForm.module.css'
import MyDatePicker from '../../components/DatePicker/MyDatePicker';
import { useNavigate } from 'react-router-dom';

const UserForm = ({cities}) => {
  const navigate = useNavigate()
  const requiredField = 'Поле обязательное для заполнения'

  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [size,setSize] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')

  const [emailError,setEmailError] = useState('')
  const [nameError,setNameError] = useState('')
  const [sizeError,setSizeError] = useState('')
  const [cityError,setCityError] = useState('')
  const [dateError, setDateError] = useState('')

  const getEmail = (e) => {
    setEmail(e.target.value)
  }
  const getName = (e) => {
    setName(e.target.value)
  }
  const getCity = (e) => {
    setCity(e.target.value)
  }
  const onBlurName = (e) => {
    if(e.target.value.length < 3){
      setNameError('Имя не должно быть меньше 3 символов') 
      if(e.target.value.length === 0){
        setNameError('')
      }
    }else {
      setNameError('')
    }
  }
  const onBlurEmail = (e) => {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())){
      setEmailError('Не корректный email')
      if(!e.target.value){
        setEmailError('')
      }
    }else{
      setEmailError('')
    }
  }
  const onBlurCity = (e) => {
    if(!e.target.value){
      return setCityError('')
    }
    const cityArr = cities.map(c => c.city)
    cityArr.includes(e.target.value) ? setCityError('') : setCityError('Вашего города нету в списке')
  }
  const getSize = (e) => {
    setSizeError('')
    setSize(e.target.value)
  }
  const getDateValue = (d) => {
    let date;
    if(!d){
      date = new Date();
    } else {
      date = new Date(d);
    }
    let dd = date.getDate();
    let mm = date.getMonth() + 1; 
    let yyyy = date.getFullYear();
    let minutes = '00' 
    let hours = date.getHours() ;
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;
    if(hours < 10) hours = '0' + hours;
    return date = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + minutes;
  }
  const getCurrDateValue = (e) => {
    let currDate = getDateValue(e.target.value)
    setDate(currDate)
    if(getDateValue() > currDate){
        setDate(getDateValue())
    }
    setDateError('')
  }
  const getSubmit = (e) => {   
    if(!name || !email || !size || !city || !date){
      if(!name){
        e.preventDefault()
        setNameError(requiredField)
      }
      if(!email){
        e.preventDefault()
        setEmailError(requiredField)
      }
      if(!size){
        e.preventDefault()
        setSizeError(requiredField)
      }
      if(!city){
        e.preventDefault()
        setCityError(requiredField)
      }
      if(!date){
        e.preventDefault()
        setDateError(requiredField)
      }
      return
    }
    if(emailError || nameError || sizeError || cityError || dateError){
      e.preventDefault()
    }
    else{
      e.preventDefault()
      navigate('/chooseMaster')
      console.log({email, name, size, city, date});
    }
  }

    return (
        <form className={classes.myForm}>
        <MyInputItem 
          value = {name}
          error = {nameError}
          onChange = {e => getName(e)}
          onBlur = {e => onBlurName(e)}
          item = {{id:'name',type:'text',placeholder:'Не менее 3 символов', discription:'Введите ваше имя',}}
        />
        <MyInputItem
          value = {email}
          error = {emailError}
          onChange = {e => getEmail(e)}
          onBlur = {e => onBlurEmail(e)}
          item={{id:'mail',type:'mail',placeholder:'example@example.com', discription:'Введите ваш email',}}
        />
        <MySizeSelector 
          onChange = {e => getSize(e)}
          error = {sizeError}
          size = {size}
        />
        <MyCitySelector
          value = {city}
          cities = {cities}
          error = {cityError}
          onChange = {e=> getCity(e)}
          onBlur = {e => onBlurCity(e)}
        />
        <MyDatePicker
          value = {date}
          error = {dateError}
          min={getDateValue()}
          onChange={e=>getCurrDateValue(e)}
          onBlur = {()=>setDateError('')}
        />
        <MyButton onClick={e=>getSubmit(e)}>Далее</MyButton>       
      </form>
      );
}
 
export default UserForm;