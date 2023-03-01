import './UserPage.css'
import { useEffect, useState } from 'react';
import MyInputItem from '../../components/InputItem/MyInputItem';
import MySizeSelector from '../../components/SizeSelector/MySizeSelector';
import MyCitySelector from '../../components/CitySelector/MyCitySelector';
import MyDatePicker from '../../components/DatePicker/MyDatePicker';
import { useNavigate } from 'react-router-dom';
import {createUser} from '../../services/user';
import MyBigButton from '../../components/Buttons/BigButton/MyBigButton';
import formatDate from '../../functions/formatDate';
import citiesAPI from '../../api/citiesAPI';

const UserForm = () => {
  const [cities, setCities] = useState([])

  useEffect(()=>{
    citiesAPI.getCities()
    .then(cities => setCities(cities))
},[])

  const navigate = useNavigate()
  const requiredField = 'Поле обязательное для заполнения'

  const [email,setEmail] = useState(sessionStorage.getItem('email') || '')
  const [name,setName] = useState(sessionStorage.getItem('name') || '')
  const [size,setSize] = useState('')
  const [city, setCity] = useState(sessionStorage.getItem('city') || '')
  const [date, setDate] = useState(sessionStorage.getItem('start') || '')

  const [emailError,setEmailError] = useState('')
  const [nameError,setNameError] = useState('')
  const [sizeError,setSizeError] = useState('')
  const [cityError,setCityError] = useState('')
  const [dateError, setDateError] = useState('')

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
    if(!e){
      return setCityError('')
    }
    const cityArr = cities.map(c => c.name)
    cityArr.includes(e) ? setCityError('') : setCityError('Вашего города нету в списке')
  }
  const getSize = (e) => {
    setSizeError('')
    setSize(e)
  }

  const getCurrDateValue = (e) => {
    let currDate = formatDate(e) 
    setDate(currDate)
    if(formatDate() > currDate){
        setDate(formatDate())
    }
    setDateError('')
  }
  const getSubmit = async(e) => {  
    e.preventDefault() 
    if(nameError || emailError || sizeError || cityError || dateError){
      return
    }
    if(!name || !email || !size || !city || !date){
      if(!name){
        setNameError(requiredField)
      }
      if(!email){
        setEmailError(requiredField)
      }
      if(!size){
        setSizeError(requiredField)
      }
      if(!city){
        setCityError(requiredField)
      }
      if(!date){
        setDateError(requiredField)
      }
      return
    }
    else{
      await createUser(e)
      navigate('chooseMaster')
    }
  }

    return (
      <div className='userPage'>
             <form className={'userForm'} onSubmit={e=>getSubmit(e)}>
                <MyInputItem
                  name = 'name' 
                  value = {name}
                  error = {nameError}
                  onChange = {e => setName(e.target.value)}
                  onBlur = {e => onBlurName(e)}
                  item = {{id:'name',type:'text',placeholder:'Не менее 3 символов', discription:'Введите ваше имя',}}
                />
                <MyInputItem
                  name = 'email'
                  value = {email}
                  error = {emailError}
                  onChange = {e => setEmail(e.target.value)}
                  onBlur = {e => onBlurEmail(e)}
                  item={{id:'mail',type:'mail',placeholder:'example@example.com', discription:'Введите ваш email',}}
                />
                <MySizeSelector 
                  name='size'
                  onChange = {e => getSize(e.target.value)}
                  error = {sizeError}
                  value = {size}
                />
                <MyCitySelector
                  name='city'
                  label = 'true'
                  value = {city}
                  cities = {cities}
                  error = {cityError}
                  onChange = {e=> setCity(e.target.value)}
                  onBlur = {e => onBlurCity(e.target.value)}
                />
                <MyDatePicker
                  name = 'date'
                  value = {date}
                  error = {dateError}
                  min={formatDate()}
                  onChange={e=>getCurrDateValue(e.target.value)}
                  onBlur = {()=>setDateError('')}
                />
                <div className='myButtonWrapper'>
                  <MyBigButton>Далее</MyBigButton>  
                </div>
              </form>
      </div>
    );
}
 
export default UserForm;