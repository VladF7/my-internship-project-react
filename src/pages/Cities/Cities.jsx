import { useState } from "react";
import MyButton from "../../components/Button/MyButton";
import MyInput from "../../components/Input/MyInput";
import MyLabel from "../../components/Label/MyLabel";
import classes from './Cities.module.css'
const Cities = ({cities,addCity,delCity}) => {
    const [city,setCity] = useState('')

    return ( 
        <div className={classes.wrapper}>
            <div className={classes.cities}>
                <ul className={classes.list}>
                    {cities.map(c => {
                        return  <li  key={c.id} className={classes.listItem} >
                                    <MyLabel 
                                        discription={c.city}/>
                                    <button 
                                        className={classes.button}
                                        id={c.id} 
                                        onClick={e=>delCity(e)}>
                                        Удалить
                                    </button>                                     
                                </li>  
                    })}
                </ul>
            </div>
            <form onSubmit={e=>addCity(e)} className={classes.form}>
                <MyLabel 
                    discription={'Добавить город в список'}
                />
                <MyInput 
                    type="text" 
                    name='city'
                    placeholder={'Введите название города'} 
                    value={city} 
                    onChange={e=>{setCity(e.target.value)}}
                />
                <MyButton>Добавить город</MyButton>
            </form>    
        </div>
     );
}
 
export default Cities;