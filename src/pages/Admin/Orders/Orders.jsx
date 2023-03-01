import { useEffect, useState } from "react"
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton"
import ordersAPI from "../../../api/ordersAPI";
import './Orders.css'
import MySpan from "../../../components/Span/MySpan";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        ordersAPI.getOrders()
        .then(orders => setOrders(orders))
        .then(()=>setIsLoading(false))
    },[])
    const delOrder = (id) => {
        ordersAPI.delOrder(id)
        setOrders(orders.filter((order) => order.id !== id))
    }

    if(isLoading === true) return <MySpan>Список заказов загружается...</MySpan> 
    
    return ( 
        <div className="itemContent">
           <div className="orders">
                <ul className="list">
                    {orders.length === 0 
                        ?   <MySpan>Список заказов пуст</MySpan>
                        :   orders.map(order => {
                            return  <li  id={order.id} key={order.id} className='listItem'>
                                        <div className="itemInfo">
                                            <MySpan>Имя: {order.name},</MySpan>
                                            <MySpan>Email: {order.email},</MySpan>
                                            <MySpan>Pазмер часов: {order.size},</MySpan>
                                            <MySpan>Время ремонта: {order.time},</MySpan>
                                            <MySpan>Имя мастера: {order.master},</MySpan>
                                            <MySpan>Город: {order.city},</MySpan>
                                            <MySpan>Начало заказа: {order.start},</MySpan>
                                            <MySpan>Конец заказа: {order.end}</MySpan>
                                        </div>
                                        <div className="buttons">
                                            <MySmallButton to={`${order.id}`}>Изменить</MySmallButton>
                                            <MySmallButton onClick={()=>delOrder(order.id)}>Удалить</MySmallButton>    
                                        </div>                                  
                                    </li>  
                        })}
                    
                </ul>
            </div>
        </div>
    );
}
 
export default Orders;