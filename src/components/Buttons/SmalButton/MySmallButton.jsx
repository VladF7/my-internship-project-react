import { Link } from 'react-router-dom';
import './MySmallButton.css'

const MySmallButton = ({children, to, ...props}) => {

    return ( 
           <Link to={to}>
            <button {...props} className={'smallButton'}>
                {children}
            </button>
           </Link>
     );
}
 
export default MySmallButton;
