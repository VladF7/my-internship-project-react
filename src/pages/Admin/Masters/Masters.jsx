import { useEffect, useState } from "react";
import mastersAPI from "../../../api/mastersAPI";
import MyLinkButton from "../../../components/Buttons/BigButton/MyLinkButton";
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton";
import MyError from "../../../components/Error/MyError";
import MySpan from "../../../components/Span/MySpan";
import './Masters.css'

const Masters = () => {

    const [masters,setMasters] = useState([])
    const [masterCities,setMasterCities] = useState([])
    const [error, setError] = useState('')
    const [currMasterId, setCurrMasterId] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const textError = 'Не может быть удален, используется в заказе'


    useEffect(()=>{
        mastersAPI.getMasters()
        .then(res => {
            setMasters(res.masters)
            setMasterCities(res.cities)
        })
        .then(()=>setIsLoading(false))
    },[])

    const deleteMaster = (id) => {
        mastersAPI.delMaster(id)
        .then(master => {
            if(!master){
                setError(textError)
                setTimeout(() => {
                    setError('')
                }, 1500);
            } else{
                setMasters(masters.filter((master) => master.id !== id))
            } 
        })
        setCurrMasterId(id)  
       
    }
  
    if(isLoading) return <MySpan>Список мастеров загружается...</MySpan>
    
    return ( 
        <div className="itemContent">
            <div className="masters">
                <ul className="list">
                    {masters.length === 0 
                        ?   <MySpan>Список мастеров пуст</MySpan> 
                        :   masters.map(master => {
                                return  <li  id={master.id} key={master.id} className='listItem'>
                                            {currMasterId === master.id ? <MyError>{error}</MyError> : ''}
                                            <div className="itemInfo">
                                                <MySpan>Имя: {master.name},</MySpan>
                                                <MySpan>Рейтинг: {master.rating},</MySpan>
                                                <MySpan>Город: {
                                                    masterCities.map(city => city.masters_id === master.id ? city.name + ', ' : "")
                                                }</MySpan> 
                                            </div>
                                            <div className="buttons">
                                                <MySmallButton to={`${master.id}`}>Изменить</MySmallButton>
                                                <MySmallButton onClick={()=>deleteMaster(master.id)} >Удалить</MySmallButton>    
                                            </div>                                  
                                        </li>  
                                }) 
                    }
                </ul> 
            </div>    
            <div className="addButtonWrapper form">
                <MyLinkButton to='addMaster'>Добавить мастера</MyLinkButton>
            </div>        
        </div> 
    );
}

export default Masters;