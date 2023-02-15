import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customersAPI from "../../../../api/customersAPI";
import mastersAPI from "../../../../api/mastersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyInputItem from "../../../../components/InputItem/MyInputItem";

const EditCustomer = () => {
    const {id} = useParams()
    useEffect(()=>{
        customersAPI.getCustomerById(id)
        .then(customer=>{
            setName(customer.name)
            setEmail(customer.email)
        })
    },[id])
 
    const prevPage = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')

    const requiredField = 'Поле обязательное для заполнения'

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
    const goBack = (e) => {
        e.preventDefault()
        prevPage(-1)
    }
    const editMaster = async(e) => {
        e.preventDefault()
        if(!name || !email){
            if(!name){
                setNameError(requiredField)
            } 
            if(!email){
                setEmailError(requiredField)
            } 
            return
        }

        await customersAPI.editCustomer(e,id)
        prevPage(-1)
        await customersAPI.getCustomers()
    }

    return ( 
        <form onSubmit={e=>editMaster(e)} className={'form'} >
            <MyInputItem
                name = 'name' 
                value = {name}
                error = {nameError}
                onChange = {e => setName(e.target.value)}
                onBlur = {e => onBlurName(e)}
                item = {{id:'name',type:'text',placeholder:'Не менее 3 символов', discription:'Введите имя клиента',}}
            />
            <MyInputItem
            name = 'email' 
            value = {email}
            error = {emailError}
            onChange = {e => setEmail(e.target.value)}
            onBlur = {e => onBlurEmail(e)}
            item = {{id:'email',type:'text',placeholder:'example@example.com', discription:'Введите email клиента',}}
            />
            <div className="myButtonWrapper">
                <MyBigButton>Изменить клиента</MyBigButton>
            </div>
            <div className="myButtonWrapper">
                <MyBigButton onClick={(e)=>goBack(e)}>Отменить</MyBigButton>
            </div>
        </form>   
    );
}
 
export default EditCustomer
;
