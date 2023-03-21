import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import citiesAPI from "../../../../api/citiesAPI";
import mastersAPI from "../../../../api/mastersAPI";
import ordersAPI from "../../../../api/ordersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyCitySelector from "../../../../components/CitySelector/MyCitySelector";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import MySelect from "../../../../components/Select/MySelect";
import MySpan from '../../../../components/Span/MySpan'

const EditOrder = () => {
    const [isLoading, setIsLoadnig] = useState(true)
    const [cities, setCities] = useState([])
    const [masters, setMasters] = useState([])
    const [master, setMaster] = useState('')
    const [size, setSize] = useState('')
    const [city, setCity] = useState('')
    const [date, setDate] = useState('')
    const [endTime, setEndTime] = useState('')

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
            setCity(order.city)
            setSize(order.size)
            setDate(parse(order.startTime,'yyyy.MM.dd, HH:mm',new Date()))
            setEndTime(order.endTime)
            setMaster(order.masterId)
        })
        .then(()=> setIsLoadnig(false))
        citiesAPI.getCities()
        .then(cities => setCities(cities))
    },[id])
    useEffect(()=>{
        if(!isLoading){
            getFreeMastersList(id,city,date,endTime)
        }
    },[endTime])
   
    
    const getFreeMastersList = async(id,city,startTime,endTime) => {
        const order = {}
        order.id = id
        order.city = city
        order.startTime = format(new Date(startTime), 'yyyy.MM.dd, HH:mm')
        order.endTime = endTime
        const masters = await mastersAPI.getFreeMasters(order)
        setMasters(masters)
        return masters
    }
    const getEndOrderTime = async(start,size) => {
        const data = {}
        data.startTime = format(new Date(start), 'yyyy.MM.dd, HH:mm')
        data.size = size
        const endTime = await ordersAPI.getOrderEndDate(data)
        setEndTime(endTime)
        return endTime
    }
    const onBlurCity = (newCity) => {
        if(!newCity){
            return setCityError('')
        }
        const cityArr = cities.map(city => city.name)
        cityArr.includes(newCity) ? setCityError('') : setCityError('Вашего города нету в списке')
        getFreeMastersList(id,newCity,date,endTime)
    }
    const onBlurMaster = () => {
        setMasterError('')
    }
    const changeSize = (e) => {
        setSize(e)
        getEndOrderTime(date, e)
    }
    const changeDate = (date) => {
        setDate(date)
        getEndOrderTime(date, size)
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
        await ordersAPI.editOrder(e,id,endTime)
        prevPage(-1)
        await ordersAPI.getOrders()
    }

    if(isLoading){
        return <MySpan>Данные загружаються, подождите...</MySpan>
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

