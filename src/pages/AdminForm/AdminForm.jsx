import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import classes from './AdminForm.module.css'

const AdminForm = () => {
    const items = [{name:'Список мастеров',path:'masters'},{name:'Список городов',path:'cities'},{name:'Список заказов',path:'orders'}]
    return (    
        <div className={classes.wrapper}>
            <div className={classes.navBar}>
                <NavBar items={items}/>
            </div>
            <div className={classes.adminItem}>
                <Outlet/>
            </div>
        </div>    
     );
}
 
export default AdminForm;