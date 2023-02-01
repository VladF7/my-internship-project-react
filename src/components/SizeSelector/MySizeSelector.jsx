import MyError from "../Error/MyError";
import classes from './MySizeSelector.module.css'
const MySizeSelector = ({error, size, ...props}) => {

    return ( 
        <div className={classes.wrapper}>
            <MyError>{error}</MyError>

            <fieldset className={classes.mySizeSelector} {...props} >  
                <legend className={classes.legend}>Выберите размер часов</legend>

                <span className={classes.item}>
                    <input className={classes.input} type="radio" id="clockChoice1"
                    name="clock-size" value="small"/>
                    <label className={classes.label} htmlFor="clockChoice1" >Маленькие</label>
                </span>

                <span className={classes.item}>
                    <input className={classes.input} type="radio" id="clockChoice2"
                    name="clock-size" value="middle"/>
                    <label className={classes.label} htmlFor="clockChoice2">Средние</label>
                </span>

                <span className={classes.item}>
                    <input className={classes.input} type="radio" id="clockChoice3"
                    name="clock-size" value="big"/>
                    <label className={classes.label} htmlFor="clockChoice3">Большие</label>
                </span>
            </fieldset>

        </div>
    );
}
 
export default MySizeSelector;