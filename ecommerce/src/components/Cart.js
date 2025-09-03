import { useContext, useEffect, useState } from "react";
import { Button, Row, Col, Card, Alert } from "react-bootstrap";

import { MyUserContext } from "../configs/Contexts";
import Apis, { endpoints } from "../configs/Apis";
import { useCart } from "../configs/CartContext";

import Product from "./layout/Product";
import CartItem from "./layout/CartItem";
import PaymentForm from "./Payments/PaymentForm";
import PaymentStatus from "./Payments/PaymentStatus";

const Cart = () => {
    const [showPayment, setShowPayment] = useState(false);
    const [orderData, setOrderData] = useState(null);
    


    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const {cartItems = [], removeFromCart, updateQuantity, getTotalAmount, clearCart} = useCart();

    const [products, setProducts] = useState([]);
    const [user,] = useContext(MyUserContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user !== null)
            loadProductInCart();
    }, []);

   //Test thử mock nha -> đổ chưa được dataa
   

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        const orderId = `ORDER_${Date.now()}`;
        setOrderData({
            orderId: orderId,
            totalAmount: totalAmount,
            items: cartItems
        });
        setShowPayment(true);
    };


    const handlePaymentSuccess = () => {
        setPaymentCompleted(true);
        clearCart(); //trả về mảng rỗng
        
    };

    const handlePaymentError = (error) => {
        console.error('Payment failed:', error);
        
    };

    if (paymentCompleted && orderData) {
        return (


            <div className="container mt-4">
                <h2>Đơn hàng đã được thanh toán</h2>
                <PaymentStatus 
                    orderId={orderData.orderId} 
                    onStatusChange={(status) => console.log('Payment status:', status)}
                />
                <Button 
                    variant="primary" 
                    className="mt-3"
                    onClick={() => {
                        setShowPayment(false);
                        setPaymentCompleted(false);
                        setOrderData(null);
                    }}
                >
                    Return lại
                </Button>
            </div>
        );
    }

    if (showPayment && orderData) {
        return (


            <div className="container mt-4">
                <PaymentForm 
                    orderData={orderData}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                />
                <Button 
                    variant="outline-secondary" 
                    className="mt-3"

                    onClick={() => setShowPayment(false)}
                >
                    Quay lại giỏ hàng
                </Button>
            </div>
        );
    }

  

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

   


    return (
        <div className="container mt-4">
            <h2>Giỏ hàng</h2>

            {products.map(product => <CartItem key={product.id} product={product} />)}

    
            
            {cartItems.length === 0 ? (
                <Alert variant="info">
                    Giỏ hàng trống <a href="/">Tiếp tục mua sắm</a>
                </Alert>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <CartItem 
                            key={item.id} 
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                        />
                    ))}
                    <Card className="mt-4">
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <h5>Tổng cộng: {getTotalAmount().toLocaleString('vi-VN')} VNĐ</h5>
                                </Col>
                                <Col md={6} className="text-end">
                                    <Button 
                                        variant="success" 
                                        size="lg"
                                        onClick={handleCheckout}
                                    >
                                        Thanh toán
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>

    );
};

export default Cart;