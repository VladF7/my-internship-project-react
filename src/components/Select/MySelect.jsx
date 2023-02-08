import MyError from '../Error/MyError';
import MyLabel from '../Label/MyLabel';
import './MySelect.css'
const MySelect = ({...props}) => {
    return ( 
        <div className="mySelect">
            <MyLabel discription={'Выберите рейтинг'}></MyLabel>
            <MyError>{props.error}</MyError>
            <select {...props} name="rating" id="rating" className='select'>
                <option value="0" disabled>Кликните для выбора рейтинга</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3" >3</option>
                <option value="4">4</option>    
                <option value="5">5</option>
            </select>
        </div>
     );
}
 
export default MySelect;