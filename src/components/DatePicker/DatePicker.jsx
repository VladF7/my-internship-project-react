import  ReactDatePicker  from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"


import MyError from "../Error/MyError";
import MyLabel from "../Label/MyLabel";
import { setHours, setMinutes } from "date-fns";

const DatePicker = ({value, onChange, error, ...props}) => {
    
    registerLocale('ru', ru)

    const changeValue = (date) => {
        if(date < new Date()){
            onChange(setHours(setMinutes(new Date(), 0), new Date().getHours() + 1))
        } else {
            onChange(date)
        }        
    }
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    return ( 
        <div className="datePickerWrapper">
            <MyError>{error}</MyError>
            <MyLabel>Выберите время и дату</MyLabel>
            <ReactDatePicker
            {...props}
            autoComplete="false"
            className="myInput"
            locale={'ru'}
            dateFormat = 'yyyy.MM.dd, HH:00'
            placeholderText="Выберите время и дату"
            timeCaption = "Время"

            selected = {value}
            onChange={changeValue}
    
            showTimeSelect 
            timeIntervals={60}
            onKeyDown = {(e)=>e.preventDefault()}
            minDate = {new Date()}
            filterTime = {filterPassedTime}
        />
        </div>
     );
}
 
export default DatePicker;