import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import citiesAPI from "../../../../api/citiesAPI";
import mastersAPI from "../../../../api/mastersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyCitySelector from "../../../../components/CitySelector/MyCitySelector";
import MyInputItem from "../../../../components/InputItem/MyInputItem";
import MySelect from "../../../../components/Select/MySelect";

const EditMaster = () => {
    const [cities, setCities] = useState([])

    const {id} = useParams()
    useEffect(()=>{
        mastersAPI.getMasterById(id)
        .then(master=>{
            setName(master.name)
            setRating(master.rating)
            setCity(master.city)
        })
        citiesAPI.getCities()
        .then(cities => setCities(cities))
    },[id])
 
    const prevPage = useNavigate()


    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
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
    const editMaster = async(e) => {
        e.preventDefault()
        if(!name || !city){
            if(!name){
                setNameError(requiredField)
            } 
            if(!city){
                setCityError(requiredField)
            } 
            return
        }

        await mastersAPI.editMaster(e,id)
        prevPage(-1)
        await mastersAPI.getMasters()
    }

    return ( 
        <form onSubmit={e=>editMaster(e)} className={'form'} >
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
            <div className="masterButton">
                <MyBigButton>Изменить мастера</MyBigButton>
            </div>
                <MyBigButton onClick={(e)=>goBack(e)}>Назад</MyBigButton>
        </form>   
    );
}
 
export default EditMaster
;

