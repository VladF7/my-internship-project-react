import './MyError.css'

const MyError = ({children}) => {
    return ( 
        <div className={'myError'}>
            {children}
        </div>
     );
}
 
export default MyError;