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

