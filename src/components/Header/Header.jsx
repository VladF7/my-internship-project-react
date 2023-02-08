import NavBar from '../NavBar/NavBar';
import './Header.css'

const Header = () => {
    const items = [{name: 'Вызвать мастера',path: '/'},{name: 'Войти',path: '/admin'}]
    return ( 
        <div className={'header'}>
            <span style={{width:'50px',height: '50px', background:'crimson', borderRadius:'50%'}}>Logo</span>
            <span className={'title'}>Clockwise Clockware</span>
            <NavBar
                items = {items}
            />
        </div>
     );
}
 
export default Header;