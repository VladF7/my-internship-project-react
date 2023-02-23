import { useNavigate } from "react-router-dom";
import MyLinkButton from "../../../components/Buttons/BigButton/MyLinkButton";
import MySpan from "../../../components/Span/MySpan";

const SuccessOrder = () => {
    const navigate = useNavigate()

    const message = `Ваш заказ успешно создан. 
    Вам на почту будет отправленно письмо с дополнительной информацией.`

    const goBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }
    return ( 
        <div className="userPage">
                <div className="mastersArea">
                    <MySpan>{message}</MySpan>
                </div>
                <div className="myButtonWrapper">
                    <MyLinkButton onClick={e=>goBack(e)}>Назад</MyLinkButton>
                </div>
        </div>
        
     );
}
 
export default SuccessOrder;