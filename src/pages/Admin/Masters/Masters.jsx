import { useEffect, useState } from "react";
import mastersAPI from "../../../api/mastersAPI";
import MyLinkButton from "../../../components/Buttons/BigButton/MyLinkButton";
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton";
import MyLabel from "../../../components/Label/MyLabel";
import MySpan from "../../../components/Span/MySpan";
import './Masters.css'

const Masters = () => {
    const [masters, setMasters] = useState([])
    
    useEffect(()=>{
        mastersAPI.getMasters()
        .then(masters => setMasters(masters))
    },[])

    const deleteMaster = (id) => {
        mastersAPI.delMaster(id)
        .then(res => {
            if(res === 'ERROR'){
                console.log(res);
            } else {
                setMasters(masters.filter((master) => master.id !== id))
            }
        }) 
    }

    return ( 
        <div className="itemContent">
            {!masters
                ?   <MySpan>Список мастеров не доступен, нету ответа от сервера</MySpan>
                :   masters.length
                    ?   <>
                            <div className="masters">
                                <ul className="list">
                                            {masters.map(m => {
                                                return  <li  id={m.id} key={m.id} className='listItem'>
                                                            <div className="itemInfo">
                                                                <MySpan>Имя: {m.name},</MySpan>
                                                                <MySpan>Рейтинг: {m.rating},</MySpan>
                                                                <MySpan>Город: {m.city}</MySpan>
                                                            </div>
                                                            <div className="buttons">
                                                                <MySmallButton to={`${m.id}`}>Изменить</MySmallButton>
                                                                <MySmallButton onClick={()=>deleteMaster(m.id)} >Удалить</MySmallButton>    
                                                            </div>                                  
                                                        </li>  
                                            })}
                                </ul>
                            </div>
                            <div className="addButtonWrapper">
                                    <MyLinkButton to='addMaster'>Добавить мастера</MyLinkButton>
                            </div>
                        </>
                    :   <MySpan>Здесь пока что нету мастеров</MySpan>
            }      
        </div> 
    );
}
 
export default Masters;