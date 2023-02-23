import { useEffect, useState } from "react"
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton"
import ordersAPI from "../../../api/ordersAPI";
import './Orders.css'
import MySpan from "../../../components/Span/MySpan";

const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        ordersAPI.getOrders()
        .then(orders => {
           return setOrders(orders)})
        
    },[])

    const delOrder = (id) => {
        ordersAPI.delOrder(id)
        setOrders(orders.filter((order) => order.id !== id))
    }
    const getDateString = (d) => {
        let time = new Date(d).getTime()
        let date = new Date(time)
        let dd = date.getDate();
        let mm = date.getMonth() + 1; 
        let yyyy = date.getFullYear();
        let minutes = '00' 
        let hours = date.getHours()
        if(dd < 10) dd = '0' + dd;
        if(mm < 10) mm = '0' + mm;
        if(hours < 10) hours = '0' + hours;
        return date = yyyy + '-' + mm + '-' + dd + ', ' + hours + ':' + minutes;    
    }
    
    return ( 
        <div className="itemContent">
            {!orders
                ?   <MySpan>Список заказов не доступен, нет ответа от сервера</MySpan>
                :   orders.length 
                    ?   <div className="orders">
                            <ul className="list">
                                {orders.map(order => {
                                    return  <li  id={order.id} key={order.id} className='listItem'>
                                                <div className="itemInfo">
                                                    <MySpan>Имя: {order.name},</MySpan>
                                                    <MySpan>Email: {order.email},</MySpan>
                                                    <MySpan>Pазмер часов: {order.size},</MySpan>
                                                    <MySpan>Время ремонта: {order.time},</MySpan>
                                                    <MySpan>Имя мастера: {order.master},</MySpan>
                                                    <MySpan>Город: {order.city},</MySpan>
                                                    <MySpan>Начало заказа: {getDateString(order.start)},</MySpan>
                                                    <MySpan>Конец заказа: {getDateString(order.end)}</MySpan>
                                                </div>
                                                <div className="buttons">
                                                    <MySmallButton to={`${order.id}`}>Изменить</MySmallButton>
                                                    <MySmallButton onClick={()=>delOrder(order.id)}>Удалить</MySmallButton>    
                                                </div>                                  
                                            </li>  
                                })}
                            </ul>
                        </div>
                    :   <MySpan>Здесь пока что нету заказов</MySpan>
            }  
        </div>
    );
}
 
export default Orders;