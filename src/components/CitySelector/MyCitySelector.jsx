import MyError from '../Error/MyError';
import MyInput from '../Input/MyInput';
import MyLabel from '../Label/MyLabel';
import classes from './MyCitySelector.module.css'

const MyCitySelector = ({...props}) => {
    return ( 
        <div className={classes.wrapper} 
        {...props}
        >
            <MyLabel htmlFor='city' discription='Выберите ваш город'></MyLabel>
            <MyInput 
                id='city' 
                list='cities' 
                placeholder='Введите название города'
            />
            <datalist  id='cities'>
            {props.cities.map((c) => <option value={c.city} key={c.id}></option>)}
            </datalist>

            <MyError>{props.error}</MyError>
        </div>
     );
}
 
export default MyCitySelector;
