import AsyncSelect from 'react-select/async';
import './ReactSelectStyles.css'
import ReactSelectJsStyles from './React-select-styles'
import MyLabel from "../Label/MyLabel";
import MyError from "../Error/MyError";

const ReactSelect = ({error, ...props}) => {

    return ( 
        <div className="reactSelectorContainer">
            <MyLabel discription={"Выберите город"}></MyLabel>
            <MyError>{error}</MyError>
            <AsyncSelect 
                {...props}
                cacheOptions
                defaultOptions
                closeMenuOnSelect={false}
                isMulti
                placeholder='Выберите город'
                isSearchable = {false}
                noOptionsMessage={() => 'Городов больше нету'}
                styles={ReactSelectJsStyles}
            />
        </div>
        
        
     );
}
 
export default ReactSelect;