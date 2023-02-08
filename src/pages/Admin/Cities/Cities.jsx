import { useEffect, useState } from "react";
import citiesAPI from "../../../api/citiesAPI";
import MyButton from "../../../components/Buttons/BigButton/MyBigButton";
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton";
import MyInput from "../../../components/Input/MyInput";
import MyLabel from "../../../components/Label/MyLabel";
import './Cities.css'
const Cities = () => {
    const [city,setCity] = useState('')
    const [cities, setCities] = useState([])

    useEffect(()=>{
      citiesAPI.getCities().then(cities => setCities(cities))
  },[])

    const createCity = (e) => {
        e.preventDefault()
        citiesAPI.addCity(e).then(city => setCities([...cities, ...city]))
        setCity('')
    }

    const deleteCity = (id) => {
        citiesAPI.delCity(id)
        setCities(cities.filter((city) => city.id !== id))
    }

    return ( 
        <div className={'itemContent'}>
            <div className={'cities'}>
                <ul className={'list'}>
                    {cities.map(city => {
                        return  <li  key={city.id} className={'listItem'} >
                                    <MyLabel 
                                        discription={city.name}/>
                                    <MySmallButton 
                                        className={'button'}
                                        id={city.id} 
                                        onClick={()=>deleteCity(city.id)}
                                    >Удалить</MySmallButton>                                     
                                </li>  
                    })}
                </ul>
            </div>
            <form onSubmit={e=>createCity(e)} className={'form'}>
                <MyLabel discription={'Добавить город в список'}/>
                <MyInput 
                    type="text" 
                    name='city'
                    placeholder={'Введите название города'} 
                    value={city} 
                    onChange={e=>{setCity(e.target.value)}}/>
                <MyButton>Добавить город</MyButton>
            </form>    
        </div>
    );
}
 
export default Cities;