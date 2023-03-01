import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect from "../../../../components/React-select/React-select";
import citiesAPI from "../../../../api/citiesAPI";
import mastersAPI from "../../../../api/mastersAPI";
import MyBigButton from "../../../../components/Buttons/BigButton/MyBigButton";
import MyInputItem from "../../../../components/InputItem/MyInputItem";
import MySelect from "../../../../components/Select/MySelect";

const EditMaster = () => {

    const {id} = useParams()
    useEffect(()=>{
        mastersAPI.getMasterById(id)
        .then(res=>{
            setName(res.master.name)
            setRating(res.master.rating)
            setCities(res.master.cities.map(city => {
                return {value:city.id,label:city.name}
            }))
        })
    },[id])

    const loadOptions = async() => {
        const cities = await citiesAPI.getCities()
        const options = await cities.map(city => {
            return {value:city.id,label:city.name}
        })
        return options.filter(option => option.value !== cities.value)
    }
    
    const prevPage = useNavigate()

    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [cities, setCities] = useState([])

    const [nameError, setNameError] = useState('')
    const [ratingError, setRatingError] = useState('')
    const [citiesError, setCitiesError] = useState('')
    const requiredField = 'Поле обязательное для заполнения'
    const ratingOptions = [
        {value: 1, label: 1,},
        {value: 2, label: 2,},
        {value: 3, label: 3,},
        {value: 4, label: 4,},
        {value: 5, label: 5,},
    ]

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
            return setCitiesError('')
        }
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
        if(!name || !cities.length){
            if(!name){
                setNameError(requiredField)
            } 
            if(!cities.length){
                setCitiesError(requiredField)
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
                options = {ratingOptions}
                placeholder= 'Кликните для выбора рейтинга'
                name = 'rating'
                discription = {'Выберите рейтинг'}
                error = {ratingError}
                value = {rating}
                onChange={e =>{changeRating(e)}}
            />
            <ReactSelect
                value={cities}
                error = {citiesError}
                name = 'cities' 
                loadOptions={loadOptions}
                onChange={e=> setCities(e)}
                onBlur = {e => onBlurCity(e)}
            />

            <div className="myButtonWrapper">
                <MyBigButton>Изменить мастера</MyBigButton>
            </div>
            <div className="myButtonWrapper">
                <MyBigButton onClick={(e)=>goBack(e)}>Отменить</MyBigButton>
            </div>
        </form>   
    );
}
 
export default EditMaster
;

