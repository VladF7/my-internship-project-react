import { useState } from "react";
import MyInputItem from "../../components/InputItem/MyInputItem";
import './LoginPage.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/auth";
import MyBigButton from '../../components/Buttons/BigButton/MyBigButton'

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/admin'
    const dispatch = useDispatch()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const requiredField = 'Поле обязательное для заполнения'

    const resetError = (setError) =>{
        setError('')
    }

    const onBlurEmail = (e) => {
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if(!re.test(String(e).toLowerCase())){
          setEmailError('Не корректный email')
          if(!e){
            setEmailError('')
          }
        }else{
          setEmailError('')
        }
      }

    const onSubmit = e => {
        e.preventDefault()
        if(!email || !password ){
           if(!email){
            setEmailError(requiredField)
           }
           if(!password){
            setPasswordError(requiredField)
           }
           return
        }
        if(emailError || passwordError){
          return
        }
        
        dispatch(login(e))
        .then(res =>{
            if(res){
                setEmailError(res.email)
                setPasswordError(res.password)
            } else {
                navigate(fromPage, {replace: true})
            }
        })
    }
    return ( 
       <form className="loginPage" onSubmit={(e)=>onSubmit(e)}>
            <MyInputItem
                name = 'email' 
                value = {email}
                error = {emailError}
                onChange = {e => setEmail(e.target.value)}
                onFocus = {()=>resetError(setEmailError)}
                onBlur = {(e)=>onBlurEmail(e.target.value)}
                item = {{id:'email',type:'text',placeholder:'Введите почтовый адресс', discription:'Введите email',}}
            /> 
            <MyInputItem
                name = 'password' 
                value = {password}
                error = {passwordError}
                onChange = {e => setPassword(e.target.value)}
                onFocus = {()=>resetError(setPasswordError)}
                item = {{id:'password',type:'password',placeholder:'Введите ваш пароль', discription:'Введите пароль',}}
            />
            <div className="myButtonWrapper">
                <MyBigButton>Войти</MyBigButton>
            </div>
            
       </form>
     );
}
 
export default LoginPage;