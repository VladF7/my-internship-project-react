import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import citiesAPI from "../../../../api/citiesAPI";
import mastersAPI from "../../../../api/mastersAPI";
import ordersAPI from "../../../../api/ordersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyCitySelector from "../../../../components/CitySelector/MyCitySelector";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import MySelect from "../../../../components/Select/MySelect";

const EditOrder = () => {
    const [cities, setCities] = useState([])
    const [masters, setMasters] = useState([])
    const [master, setMaster] = useState('')
    const [size, setSize] = useState('')
    const [city, setCity] = useState('')
    const [date, setDate] = useState('')
    const [endOrderDate, setEndOrderDate] = useState('')

    const [cityError, setCityError] = useState('')
    const [masterError, setMasterError] = useState('')

    const requiredField = 'Поле обязательное для заполнения'
    const sizeOptions = [
        {value: 'Маленькие', label: 'Маленькие'},
        {value: 'Средние', label: 'Средние'},
        {value: 'Большие', label: 'Большие'},
    ]
    const mastersOptions = masters.map(master => {
        return {value: master.id, label: `Имя: ${master.name}, рейтинг: ${master.rating}`}
    })

    const prevPage = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        ordersAPI.getOrderById(id)
        .then(order=>{
            console.log(order);
            setCity(order.city)
            setSize(order.size)
            setDate(new Date(order.start))
            setEndOrderDate(order.end)
            setMaster(order.master_id)
        })
        citiesAPI.getCities()
        .then(cities => setCities(cities))
    },[id])
    console.log(date);
    useEffect(()=>{
        getFreeMastersList(id,city,date,endOrderDate)
    },[endOrderDate])
   
    
    const getFreeMastersList = async(id,city,date,endDate) => {
        const order = {}
        order.id = id
        order.city = city
        order.start = format(new Date(date), 'MM.dd.yyyy, HH:mm')
        order.end = endDate
        const masters = await mastersAPI.getFreeMasters(order)
        setMasters(masters)
        return masters
    }
    const getEndOrderDate = async(start,size) => {
        const data = {}
        data.start = format(new Date(start), 'MM.dd.yyyy, HH:mm')
        data.size = size
        const end = await ordersAPI.getOrderEndDate(data)
        setEndOrderDate(end)
        return end
    }
    const onBlurCity = (newCity) => {
        if(!newCity){
            return setCityError('')
        }
        const cityArr = cities.map(city => city.name)
        cityArr.includes(newCity) ? setCityError('') : setCityError('Вашего города нету в списке')
        getFreeMastersList(id,newCity,date,endOrderDate)
    }
    const onBlurMaster = () => {
        setMasterError('')
    }
    const changeSize = (e) => {
        setSize(e)
        getEndOrderDate(date, e)
    }
    const changeDate = (date) => {
        setDate(date)
        getEndOrderDate(date, size)
    }

    const changeMaster = (e) => {
        setMaster(e)
        setMasterError('')
    }
    const goBack = (e) => {
        e.preventDefault()
        prevPage(-1)
    }
    const editOrder = async(e) => {
        e.preventDefault()
        if(!city || masters.length===0 ){
            if(!city ){
                setCityError(requiredField)
            } 
            if(masters.length===0){
                setMasterError(requiredField)
            } 
            return
        }
        await ordersAPI.editOrder(e,id,endOrderDate)
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
                onBlur = {e => onBlurCity(e.target.value)}
            />
            <DatePicker
                name = 'date'
                value = {date}
                onChange={date=>changeDate(date)}
            />
            <MySelect
                options = {sizeOptions}
                placeholder= 'Кликните для выбора размера'
                name = 'size'
                discription = {'Выберите размер часов'}
                value = {size}
                onChange={e =>{changeSize(e.target.value)}}
            />
            <MySelect
                options = {mastersOptions}
                placeholder= 'Кликните для выбора мастера'
                name = 'master'
                discription = {'Выберите мастера'}
                error = {masterError}
                value = {master}
                onChange={e =>changeMaster(e.target.value)}
                onBlur = {() =>onBlurMaster()}
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

