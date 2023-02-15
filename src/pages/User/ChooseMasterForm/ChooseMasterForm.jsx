import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../api/userAPI";
import MyBigButton from "../../../components/Buttons/BigButton/MyBigButton";
import MyError from "../../../components/Error/MyError";
import MyLabel from "../../../components/Label/MyLabel";
import MySpan from "../../../components/Span/MySpan";

const ChooseMasterForm = () => {
    const navigate = useNavigate() 
    const [masters, setMasters] = useState([])
    const [masterId,setMasterId] = useState('')
    const [masterIdError,setMasterIdError] = useState('')

    useEffect(()=>{
        userAPI.getFreeMasters()
        .then(masters=>setMasters(masters))
    },[])
    
    function onSubmit(e) {
      e.preventDefault()
      if(!masterId){
        setMasterIdError('Обязательно укажите мастера')
        return
      } else {
        userAPI.addOrder(e)
        navigate('/successOrder',{replace: true})
      }
    }
    function getMasterId(e) {
      setMasterId(e.target.value)
      setMasterIdError('')
    }
    const goBack = (e) => {
      e.preventDefault()
      navigate(-1)
  }

    return ( 
        <div className="userPage">
          {!masters 
            ? <MySpan>Нет ответа от сервера</MySpan>
            : masters.length
              ? <form className="userForm" onSubmit={e=>onSubmit(e)}>
                  <div className="mastersArea">
                    <fieldset className="mastersFieldset">
                      <MyError>{masterIdError}</MyError>
                      <legend className="legend">Выберите мастера</legend>
                      {
                        masters.map(master => {
                          return  <div className="masterItem" key={master.id}>
                                    <input className="input" onChange={e=>getMasterId(e)} type="radio" id={master.id} name="masterId" value={master.id}/>
                                    <MyLabel htmlFor={master.id} discription={`имя: ${master.name}, рейтинг: ${master.rating},`}></MyLabel>
                                  </div>
                        })
                      }
                    </fieldset>
                  </div>
                    <div className="myButtonWrapper">
                      <MyBigButton>Сделать заказ</MyBigButton>
                    </div>
                      <MyBigButton onClick={(e)=>goBack(e)}>Отменить</MyBigButton>
                </form> 
              : <MySpan>К сожалению сейчас нету свободных мастеров, выберите другое время</MySpan>
          }
        </div>
     )
}
 
export default ChooseMasterForm;