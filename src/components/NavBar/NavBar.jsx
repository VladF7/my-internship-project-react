import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css'



const NavBar = ({items}) => {
    return ( 
        <nav>
            <ul className={classes.ul}>
                {items.map((item,index) => {
                    return  <li className={classes.li} key={index}>
                            <NavLink to={item.path} className={classes.link}>{item.name}</NavLink>
                            </li>
                })}
            </ul>
        </nav>
     );
}
 
export default NavBar;