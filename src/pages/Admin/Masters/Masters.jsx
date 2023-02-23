import { useEffect, useState } from "react";
import mastersAPI from "../../../api/mastersAPI";
import MyLinkButton from "../../../components/Buttons/BigButton/MyLinkButton";
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton";
import MyError from "../../../components/Error/MyError";
import MySpan from "../../../components/Span/MySpan";
import './Masters.css'

const Masters = () => {
    const [masters, setMasters] = useState([])
    const [cities, setCities] = useState([])
    const [error, setError] = useState('')
    const [masterId, setMasterId] = useState('')
    const textError = 'Не может быть удален, используется в заказе'

    useEffect(()=>{
        mastersAPI.getMasters()
        .then(response => {
            return setMasters(response.masters), setCities(response.cities)
        })
    },[])

    const deleteMaster = (id) => {
        mastersAPI.delMaster(id)
        .then(master => {
            if(!master){
                setError(textError)
                setTimeout(() => {
                    setError('')
                }, 1500);
            } else {
                setMasters(masters.filter((master) => master.id !== id))
            }
        }) 
        setMasterId(id)
    }

    return ( 
        <div className="itemContent">
            {!masters
                ?   <MySpan>Список мастеров не доступен, нет ответа от сервера</MySpan>
                :   <> 
                        {masters.length
                        ?   <div className="masters">
                                    <ul className="list">
                                                {masters.map(master => {
                                                    return  <li  id={master.id} key={master.id} className='listItem'>
                                                                {
                                                                masterId === master.id ? <MyError>{error}</MyError> : ""
                                                                }
                                                                <div className="itemInfo">
                                                                    <MySpan>Имя: {master.name},</MySpan>
                                                                    <MySpan>Рейтинг: {master.rating},</MySpan>
                                                                    
                                                                    <MySpan>Город: {
                                                                        cities.map(city => city.masters_id === master.id ? city.name + ', ' : "")
                                                                    }</MySpan> 
                                                                </div>
                                                                <div className="buttons">
                                                                    <MySmallButton to={`${master.id}`}>Изменить</MySmallButton>
                                                                    <MySmallButton onClick={()=>deleteMaster(master.id)} >Удалить</MySmallButton>    
                                                                </div>                                  
                                                            </li>  
                                                })}
                                    </ul>
                            </div>
                        :   <div className="masters">
                                <MySpan>Здесь пока что нету мастеров</MySpan>
                            </div>
                        }   
                        <div className="addButtonWrapper">
                            <MyLinkButton to='addMaster'>Добавить мастера</MyLinkButton>
                        </div> 
                    </>
                                      
            }  
                        
        </div> 
    );
}
 
export default Masters;