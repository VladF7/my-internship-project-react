import MySpan from "../../../components/Span/MySpan";

const SuccessOrder = () => {
    const message = `Ваш заказ успешно создан. 
    Вам на почту будет отправленно письмо с дополнительной информацией.`
    return ( 
        <div className="userPage">
            <MySpan>{message}</MySpan>
        </div>
     );
}
 
export default SuccessOrder;