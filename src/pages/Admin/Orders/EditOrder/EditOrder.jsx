import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import citiesAPI from "../../../../api/citiesAPI";
import mastersAPI from "../../../../api/mastersAPI";
import ordersAPI from "../../../../api/ordersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyCitySelector from "../../../../components/CitySelector/MyCitySelector";
import MyInputItem from "../../../../components/InputItem/MyInputItem";
import MySelect from "../../../../components/Select/MySelect";

const EditOrder = () => {
    const [cities, setCities] = useState([])
    const [masters, setMasters] = useState('')
    const [sizes, setSizes] = useState('')



    const {id} = useParams()
    useEffect(()=>{
        ordersAPI.getOrderById(id)
        .then(order=>{
            setSize(order.size)
            setMaster(order.master)
            setCity(order.city)
            setStartOrderDate(order.start)
        })
        citiesAPI.getCities()
        .then(cities => setCities(cities))
        mastersAPI.getMasters()
        .then(masters => setMasters(masters))
        console.log(masters);

    },[id])
 
    const prevPage = useNavigate()

    const [size, setSize] = useState('')
    const [master, setMaster] = useState('')
    const [city, setCity] = useState('')
    const [startOrderDate,setStartOrderDate] = useState('')

    const [nameError, setNameError] = useState('')
    const [cityError, setCityError] = useState('')
    const [sizeError, setSizeError] = useState('')
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
    const onBlurCity = (e) => {
        if(!e.target.value){
            return setCityError('')
        }
        const cityArr = cities.map(c => c.name)
        cityArr.includes(e.target.value) ? setCityError('') : setCityError('Вашего города нету в списке')
    }
    const goBack = (e) => {
        e.preventDefault()
        prevPage(-1)
    }
    const editOrder = async(e) => {
        e.preventDefault()
        if(!size || !master || !city || !startOrderDate){
            if(!city){
                setCityError(requiredField)
            } 
            return
        }

        await ordersAPI.editOrder(e,id)
        prevPage(-1)
        await ordersAPI.getOrders()
    }

    return ( 
        <form onSubmit={e=>editOrder(e)} className={'form'} >
            <MyCitySelector
                value={city}
                cities={cities}
                error = {cityError}
                onChange={e=> setCity(e.target.value)}
                onBlur = {e => onBlurCity(e)}
            />
            <div className="myButtonWrapper">
                <MyBigButton>Изменить заказ</MyBigButton>
            </div>
            <div className="myButtonWrapper">
                <MyBigButton onClick={(e)=>goBack(e)}>Отменить</MyBigButton>
            </div>
        </form>   
    );
}
 
export default EditOrder
;

