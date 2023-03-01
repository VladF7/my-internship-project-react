import './MyLabel.css'

const MyLabel = ({children,discription, ...props}) => {
    return ( 
        <label 
            className={'myLabel'} 
            {...props}
        >{discription}{children}</label>
     );
}
 
export default MyLabel;