import MyInput from '../Input/MyInput';
import MyLabel from '../Label/MyLabel';
import MyError from '../Error/MyError';
import './MyInputItem.css'

const MyInputItem = ({item, ...props}) => {

    return ( 
        <div className={'inputItem'}>
            <MyLabel htmlFor={item.id} discription={item.discription}></MyLabel>
            <MyError>{props.error}</MyError>
            <MyInput
                id={item.id} 
                type={item.type}
                placeholder={item.placeholder}
                {...props}
            />
            
        </div>
     );
}
 
export default MyInputItem;