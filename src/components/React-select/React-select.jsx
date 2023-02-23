import { useEffect, useState } from "react";
import citiesAPI from "../../api/citiesAPI";
import AsyncSelect from 'react-select/async';
import './React-select-styles.css'
import styles from './React-select-styles'
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
                styles={styles}
            />
        </div>
        
        
     );
}
 
export default ReactSelect;