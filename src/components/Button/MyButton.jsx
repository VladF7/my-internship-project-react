import { Link } from 'react-router-dom';
import classes from './MyButton.module.css'

const MyButton = ({children, ...props}) => {

    return ( 
        <div className={classes.wrapper}>
            <button {...props} className={classes.myButton}>
                {children}
            </button>
        </div>
     );
}
 
export default MyButton;
