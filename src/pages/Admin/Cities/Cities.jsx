import { useEffect, useState } from "react";
import citiesAPI from "../../../api/citiesAPI";
import MyButton from "../../../components/Buttons/BigButton/MyBigButton";
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton";
import MyError from "../../../components/Error/MyError";
import MyInput from "../../../components/Input/MyInput";
import MyLabel from "../../../components/Label/MyLabel";
import './Cities.css';
import ordersAPI from "../../../api/ordersAPI"
import MySpan from "../../../components/Span/MySpan";
const Cities = () => {
    const [city,setCity] = useState('')
    const [cities, setCities] = useState([])
    const [cityError, setCityError] = useState('')
    const requiredField = 'Поле обязательное для заполнения'

    useEffect(()=>{
      citiesAPI.getCities().then(cities => setCities(cities))
  },[])

    const onBlurCity = (e) => {
        if(e.target.value !==0){
            return setCityError('')
        }
    }

    const addCity = (e) => {
        e.preventDefault()

        if(!city){
            return setCityError(requiredField)
          }
       
        citiesAPI.addCity(e).then(city => setCities([...cities, ...city]))
        setCity('')
        ordersAPI.getOrders()
    }

    const delCity = (id) => {
        citiesAPI.delCity(id)
        .then(res => {
            if(res === 'ERROR'){
                setCityError('Не может быть удален')
                setTimeout(() => {
                    setCityError('')
                }, 1000);
            } else{
                setCities(cities.filter((city) => city.id !== id))
            }
                
            
        }) 
    }

    return ( 
        <div className={'itemContent'}>
            {!cities 
                ?   <MySpan>Список городов не доступен, нет ответа от сервера</MySpan>  
                :   cities.length
                    ?   <div className={'cities'}>
                                <ul className={'list'}>
                                    {cities.map(city => {
                                        return  <li  id={city.id} key={city.id} className={'listItem'} >
                                                    <div className="itemInfo">
                                                        <MySpan>{city.name}</MySpan>
                                                    </div>
                                                    <div className="buttons">
                                                        <MySmallButton onClick={()=>delCity(city.id)}>Удалить</MySmallButton>                                       
                                                    </div>  
                                                </li>    
                                    })}
                                </ul>
                            </div>
                    :   <>
                            <div className="cities">
                                <MySpan>Здесь пока что нету городов</MySpan>
                            </div>
                            <form onSubmit={e=>addCity(e)} className={'form'}>
                                <MyLabel discription={'Добавить город в список'}/>
                                <MyError>{cityError}</MyError>
                                <MyInput 
                                    type="text" 
                                    name='city'
                                    placeholder={'Введите название города'} 
                                    value={city} 
                                    onBlur = {e=>onBlurCity(e)}
                                    onChange={e=>{setCity(e.target.value)}}/>
                                <MyButton>Добавить город</MyButton>
                            </form> 
                        </>
            }
            
        </div>
    );
}
 
export default Cities;