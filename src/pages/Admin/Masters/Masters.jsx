import { useEffect, useState } from "react";
import mastersAPI from "../../../api/mastersAPI";
import MyLinkButton from "../../../components/Buttons/BigButton/MyLinkButton";
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton";
import MyLabel from "../../../components/Label/MyLabel";
import './Masters.css'

const Masters = () => {
    const [masters, setMasters] = useState([])
    
    useEffect(()=>{
        mastersAPI.getMasters()
        .then(masters => setMasters(masters))
    },[])

    const deleteMaster = (id) => {
        mastersAPI.delMaster(id)
        setMasters(masters.filter((master) => master.id !== id))
    }

    return ( <div className="itemContent">
               <div className="masters">
                    <ul className="list">
                                {masters.map(m => {
                                    return  <li  id={m.id} key={m.id} className='listItem'>
                                                <div className="masterInfo">
                                                  
                                                        <MyLabel discription={`имя: ${m.name},`}></MyLabel>
                                                        <MyLabel discription={`рейтинг: ${m.rating},`}></MyLabel>
                                                        <MyLabel discription={`город: ${m.city} `}></MyLabel>
                                                   
                                                </div>
                                                <div className="buttons">
                                                    <MySmallButton to={`${m.id}`}>Изменить</MySmallButton>
                                                    <MySmallButton onClick={()=>deleteMaster(m.id)} >Удалить</MySmallButton>    
                                                </div>                                  
                                            </li>  
                                })}
                        </ul>
                    
               </div>
               <div className="addMasterButton">
                    <MyLinkButton to='addMaster'>Добавить мастера</MyLinkButton>
               </div>
              
    </div> );
}
 
export default Masters;