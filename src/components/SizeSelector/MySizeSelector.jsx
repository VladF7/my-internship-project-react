import MyError from "../Error/MyError";
import './MySizeSelector.css'
const MySizeSelector = ({error, ...props}) => {
    const options = [
        {value: 'Маленькие', id:"clockChoice1",},
        {value: 'Средние', id:"clockChoice2",},
        {value: 'Большие', id:"clockChoice3",},
    ]
    
    return ( 
        <div className={'sizeSelector'}>
            <MyError>{error}</MyError>

            <fieldset className={'fieldset'} {...props} >  
                <legend className={'legend'}>Выберите размер часов</legend>
                    {options.map(option => {
                        return  <span key={option.id} className={'item'}>
                                <input 
                                    className={'input'} 
                                    type="radio" 
                                    id={option.id}
                                    name="size" 
                                    value={option.value}
                                    />
                                <label 
                                    className={'label'} 
                                    htmlFor={option.id} 
                                >
                                    {option.value}
                                </label>
                            </span>
                    
                    })}
            </fieldset>

        </div>
    );
}
 
export default MySizeSelector;
