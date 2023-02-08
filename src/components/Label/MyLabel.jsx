import './MyLabel.css'

const MyLabel = ({discription, ...props}) => {
    return ( 
        <label 
            className={'myLabel'} 
            {...props}
        >{discription}</label>
     );
}
 
export default MyLabel;