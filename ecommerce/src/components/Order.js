import { useEffect, useState } from "react";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { Alert } from "react-bootstrap";

const Order = () => {

    const [orders, setOrders] = useState([]);

    const loadMyOrder = async () => {
        let res = await authApis().get(endpoints["order"]);

        console.log(res.data);
        setOrders(res.data);
    }

    useEffect(() => {
        loadMyOrder();
    }, []);

    return (
        <>
            <h2 className="text-center text-danger">Lịch sử mua hàng</h2>
            {orders.length === 0 ? <Alert variant="info">Bạn chưa có đơn hàng nào</Alert> :
                <>
                    {orders.map(order => {
                        <Alert key={order.id} variant="info">Chưa biết thêm gì</Alert>
                    })}
                </>}
        </>
    );
}

export default Order;