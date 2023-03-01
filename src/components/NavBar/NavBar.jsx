import { NavLink } from 'react-router-dom';
import './NavBar.css'



const NavBar = ({items}) => {
    return ( 
        <nav>
            <ul className={'navList'}>
                {items.map((item,index) => {
                    return  <li key={index}>
                            <NavLink onClick={item.onClick} to={item.path} className={'link'}>{item.name}</NavLink>
                            </li>
                })}
            </ul>
        </nav>
     );
}
 
export default NavBar;