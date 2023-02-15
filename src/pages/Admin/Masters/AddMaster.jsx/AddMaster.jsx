import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import citiesAPI from "../../../../api/citiesAPI";
import mastersAPI from "../../../../api/mastersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyCitySelector from "../../../../components/CitySelector/MyCitySelector";
import MyInputItem from "../../../../components/InputItem/MyInputItem";
import MySelect from "../../../../components/Select/MySelect";

const AddMaster = () => {
    const [cities, setCities] = useState([])

    useEffect(()=>{
        citiesAPI.getCities()
        .then(cities => setCities(cities))
    },[])

    const prevPage = useNavigate()

    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [city, setCity] = useState('')

    const [nameError, setNameError] = useState('')
    const [ratingError, setRatingError] = useState('')
    const [cityError, setCityError] = useState('')
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
    const changeRating = (e) => {
        setRating(e.target.value)
        setRatingError('')
    }
    const goBack = (e) => {
        e.preventDefault()
        prevPage(-1)
    }
    
    const addMaster = async(e) => {
        e.preventDefault()
        if(!name || !rating || !city){
            if(!name){
                setNameError(requiredField)
            } 
            if(!rating){
                setRatingError(requiredField)
            } 
            if(!city){
                setCityError(requiredField)
            } 
            return
        }
        await mastersAPI.addMaster(e)

        setName('')
        setRating(0)
        setCity('')
        prevPage(-1)

        await mastersAPI.getMasters()
    }
    return ( 
        <form onSubmit={e=>addMaster(e)} className={'form'} >
        <MyInputItem
          name = 'name' 
          value = {name}
          error = {nameError}
          onChange = {e => setName(e.target.value)}
          onBlur = {e => onBlurName(e)}
          item = {{id:'name',type:'text',placeholder:'Не менее 3 символов', discription:'Введите имя мастера',}}
        />

        <MySelect
            rating={rating}
            error = {ratingError}
            value = {rating}
            onChange={e =>{changeRating(e)}}
        />

        <MyCitySelector
            value={city}
            cities={cities}
            error = {cityError}
            onChange={e=> setCity(e.target.value)}
            onBlur = {e => onBlurCity(e)}
        />
        <div className="myButtonWrapper">
            <MyBigButton>Добавить мастера</MyBigButton>
        </div>
        <div className="myButtonWrapper">
            <MyBigButton onClick={(e)=>goBack(e)}>Отменить</MyBigButton>
        </div>
    </form>   
     );
}
 
export default AddMaster;