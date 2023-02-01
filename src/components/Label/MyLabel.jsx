import classes from './MyLabel.module.css'

const MyLabel = ({discription, ...props}) => {
    return ( 
        <label 
            className={classes.myLabel} 
            {...props}
        >{discription}</label>
     );
}
 
export default MyLabel;