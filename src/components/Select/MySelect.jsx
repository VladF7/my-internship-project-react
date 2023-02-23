import MyError from '../Error/MyError';
import MyLabel from '../Label/MyLabel';
import './MySelect.css'
const MySelect = ({discription,name,placeholder,options, ...props}) => {
    return ( 
        <div className="mySelect">
            <MyLabel discription={discription}></MyLabel>
            <MyError>{props.error}</MyError>
            <select {...props} name={name} id={name} className='select' >
                <option value="0" disabled >{placeholder}</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
     );
}
 
export default MySelect;