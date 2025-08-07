import { useContext, useEffect, useState } from "react";
import CartItem from "./layout/CartItem";
import { MyUserContext } from "../configs/Contexts";
import Apis, { endpoints } from "../configs/Apis";
import Product from "./layout/Product";


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [user,] = useContext(MyUserContext);
    const [cart, setCart] = useState([]);

    const loadProductInCart = async () => {
        let res = await Apis.get(endpoints['cart'](user.id));
        let items = res.data.item;
        console.error(res.data);
        setCart(res.data);

        let fullProducts = await Promise.all(
            items.map(async item => {
                let productRes = await Apis.get(endpoints['product-detail'](item.id));  // bạn cần định nghĩa endpoint này
                return {
                    ...item,
                    image: productRes.data.image
                };
            })
        );

        console.log("Giỏ hàng: ", fullProducts);

        setProducts(fullProducts);
    }

    useEffect(() => {
        if (user !== null)
            loadProductInCart();
    }, []);


    return (
        <>
            <h2>Giỏ hàng</h2>
            {products.map(product => <CartItem key={product.id} product={product} />)}

            <div>Tổng tiền: {cart.total} VNĐ</div>
            {cart.item && cart.item.map(item => (
                <div key={item.id}>Số lượng: {item.quantity}</div>
            ))}

        </>
    );
}

export default Cart;