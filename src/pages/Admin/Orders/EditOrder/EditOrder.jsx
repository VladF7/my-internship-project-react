import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import citiesAPI from "../../../../api/citiesAPI";
import mastersAPI from "../../../../api/mastersAPI";
import ordersAPI from "../../../../api/ordersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyCitySelector from "../../../../components/CitySelector/MyCitySelector";
import MyDatePicker from "../../../../components/DatePicker/MyDatePicker";
import MySelect from "../../../../components/Select/MySelect";
import formatDate from "../../../../functions/formatDate";

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

    const prevPage = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        ordersAPI.getOrderById(id)
        .then(order=>{
            setCity(order.city)
            setSize(order.size)
            setDate(order.start)
            setEndOrderDate(order.end)
            setMasters([
                {id:order.master_id, name:order.master, rating:order.rating}
            ])
        })
        citiesAPI.getCities()
        .then(cities => setCities(cities))
    },[id])

    const requiredField = 'Поле обязательное для заполнения'
    const sizeOptions = [
        {value: 'Маленькие', label: 'Маленькие'},
        {value: 'Средние', label: 'Средние'},
        {value: 'Большие', label: 'Большие'},
    ]
    const mastersOptions = masters.map(master => {
        return {value: master.id, label: `Имя: ${master.name}, рейтинг: ${master.rating}`}
    })
    
    
    const getFreeMastersList = async(id,city,date,endDate) => {
        const data = {}
        data.id = id
        data.city = city
        data.start = date
        data.end = endDate
        const masters = await mastersAPI.getFreeMasters(data)
        setMasters(masters)
    }
    const getEndOrderDate = async(start,size) => {
        const data = {}
        data.start = start
        data.size = size
        const end = await ordersAPI.getOrderEndDate(data)
        setEndOrderDate(end)
    }
    const onBlurCity = (e) => {
        if(!e){
            return setCityError('')
        }
        const cityArr = cities.map(c => c.name)
        cityArr.includes(e) ? setCityError('') : setCityError('Вашего города нету в списке')

        getFreeMastersList(id,e,date,endOrderDate)
    }
    const onBlurDate = () => {
        getFreeMastersList(id,city,date,endOrderDate)
    }
    const onBlurSize = () => {
        getFreeMastersList(id,city,date,endOrderDate)
    }
    const onBlurMaster = () => {
        setMasterError('')
    }
    const changeSize = (e) => {
        setSize(e)
        getEndOrderDate(date, e)
    }
        
    const getCurrDateValue = (e) => {
        let currDate = formatDate(e)
        setDate(currDate)
        if(formatDate() > currDate){
            setDate(formatDate())
        }
        getEndOrderDate(e, size)
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
            <MyDatePicker
                name = 'date'
                value = {date}
                min={formatDate()}
                onChange={e=>getCurrDateValue(e.target.value)}
                onBlur = {()=>onBlurDate()}
            />
            <MySelect
                options = {sizeOptions}
                placeholder= 'Кликните для выбора размера'
                name = 'size'
                discription = {'Выберите размер часов'}
                value = {size}
                onChange={e =>{changeSize(e.target.value)}}
                onBlur = {()=>onBlurSize()}
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

