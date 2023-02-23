import { useEffect, useState } from "react"
import MySmallButton from "../../../components/Buttons/SmalButton/MySmallButton"
import customersAPI from "../../../api/customersAPI";
import './Customers.css'
import MySpan from "../../../components/Span/MySpan";
import MyError from "../../../components/Error/MyError";

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const [error, setError] = useState('')
    const [customerId, setCustomerId] = useState('')
    const textError = 'Не может быть удален, используется в заказе'

    useEffect(()=>{
        customersAPI.getCustomers()
        .then(customers => setCustomers(customers))
    },[])

    const deleteCustomer = (id) => {
        customersAPI.delCustomer(id)
        .then(customer => {
            if (!customer){
                setError(textError)
                setTimeout(() => {
                    setError('') 
                }, 1500);
            } else {
                setCustomers(customers.filter((customer) => customer.id !== id))
            }
        })
        setCustomerId(id)     
    }
    return ( 
        <div className="itemContent">
            {!customers
                ?   <MySpan>Список клиентов не доступен, нет ответа от сервера</MySpan>
                :   customers.length 
                    ?   <div className="customers">
                            <ul className="list">
                                {customers.map(customer => {
                                    return  <li  id={customer.id} key={customer.id} className='listItem'>
                                                {
                                                customerId === customer.id ? <MyError>{error}</MyError> : ""
                                                }
                                                <div className="itemInfo">
                                                    <MySpan>Имя: {customer.name},</MySpan>
                                                    <MySpan>Email: {customer.email}</MySpan>
                                                </div>
                                                <div className="buttons">
                                                    <MySmallButton to={`${customer.id}`}>Изменить</MySmallButton>
                                                    <MySmallButton onClick={()=>deleteCustomer(customer.id)}>Удалить</MySmallButton>    
                                                </div>                                  
                                            </li>  
                                })}
                            </ul>
                        </div>
                    :   <MySpan>Здесь пока что нету клиентов</MySpan>
            }
        </div>
    );
}
 
export default Customers;