import { Link } from 'react-router-dom';

const MyBigButton = ({children,to, ...props}) => {

    return ( 
        <Link to={to}>
            <button {...props} className={'bigButton'}>
                {children}
            </button>
        </Link>
               
     );
}
 
export default MyBigButton;
