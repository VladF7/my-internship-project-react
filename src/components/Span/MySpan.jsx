import './MySpan.css'
const MySpan = ({children,...props}) => {
    return ( 
        <span className='mySpan' {...props}> {children} </span>
     );
}
 
export default MySpan;