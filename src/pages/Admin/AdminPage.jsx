
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import './AdminPage.css'

const AdminForm = () => {


    const items = [
        {name:'Список мастеров',path:'masters'},
        {name:'Список городов',path:'cities'},
        {name:'Список заказов',path:'orders'},
        {name:'Список клиентов',path:'customers'}
    ]
    return (    
        <div className={'adminPage'}>
            <div className={'navBar'}>
                <NavBar items={items}/>
            </div>
            <div className={'adminItem'}>
                <Outlet/>
            </div>
        </div>    
     );
}
 
export default AdminForm;