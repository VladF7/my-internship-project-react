import NavBar from '../NavBar/NavBar';
import classes from './Header.module.css'

const Header = () => {
    const items = [{name: 'Вызвать мастера',path: '/'},{name: 'Войти',path: '/adminForm'}]
    return ( 
        <div className={classes.wrapper}>
            <span style={{width:'50px',height: '50px', background:'crimson', borderRadius:'50%'}}>Logo</span>
            <span className={classes.title}>Clockwise Clockware</span>
            <NavBar
                items = {items}
            />
        </div>
     );
}
 
export default Header;