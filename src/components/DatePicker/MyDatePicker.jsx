import { useState } from "react";
import MyError from "../Error/MyError";
import MyInput from "../Input/MyInput";
import MyLabel from "../Label/MyLabel";
import classes from './MyDatePicker.module.css'

const MyDatePicker = ({...props}) => {

    return (  
        <div className={classes.wrapper}>
            <MyError>{props.error}</MyError>
            <MyLabel htmlFor="data" discription='Выберите время и дату'/>
            <MyInput 
                id="data" 
                type="datetime-local" 
                name="date"
                {...props}
            />
        </div>
    );
}
 
export default MyDatePicker;

// let today = new Date();
// let currDate = new Date(e.target.value)
// setDate(e.target.value)
// let dd = currDate.getDate();
// let mm = currDate.getMonth() + 1; 
// let yyyy = currDate.getFullYear();
// let minutes = currDate.setMinutes('00')
// let hours = currDate.getHours()

// if(today.getDate() > dd){
//     dd = today.getDate()
// }
// if(today.getMonth() > mm){
//     mm = today.getMonth()
// }
// if(today.getFullYear() > yyyy){
//     yyyy = today.getFullYear()
// }
// if(today.getHours() > hours){
//     hours = today.getHours() +1
// }

// if(dd < 10){
// dd='0' + dd
// } 
// if(mm < 10){
// mm='0' + mm
// }
// if(hours < 10){
// hours='0' + hours 
// }
// minutes='00' 
// currDate = yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + minutes;
// setDate(currDate)