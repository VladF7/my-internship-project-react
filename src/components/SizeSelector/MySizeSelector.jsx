import MyError from "../Error/MyError";
import './MySizeSelector.css'
const MySizeSelector = ({error, size, ...props}) => {

    return ( 
        <div className={'sizeSelector'}>
            <MyError>{error}</MyError>

            <fieldset className={'fieldset'} {...props} >  
                <legend className={'legend'}>Выберите размер часов</legend>

                <span className={'item'}>
                    <input className={'input'} type="radio" id="clockChoice1"
                    name="size" value="small"/>
                    <label className={'label'} htmlFor="clockChoice1" >Маленькие</label>
                </span>

                <span className={'item'}>
                    <input className={'input'} type="radio" id="clockChoice2"
                    name="size" value="middle"/>
                    <label className={'label'} htmlFor="clockChoice2">Средние</label>
                </span>

                <span className={'item'}>
                    <input className={'input'} type="radio" id="clockChoice3"
                    name="size" value="big"/>
                    <label className={'label'} htmlFor="clockChoice3">Большие</label>
                </span>
            </fieldset>

        </div>
    );
}
 
export default MySizeSelector;