import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {useCart} from "../../configs/CartContext";


const Product = ({ product }) => {

    const nav = useNavigate();
    const {addToCart} = useCart();



    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        
        alert('Thêm thahf công!');
    };

     return (
        <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body>

            
            <Card.Title className="text-center">{product.name}</Card.Title>
            <Card.Text style={{ minHeight: '60px' }}>{product.description}</Card.Text>
            <Card.Text className="fw-bold text-danger">

            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">

            <Button onClick={() => nav(`/product/${product.id}`)} variant="primary" size="sm">Xem chi tiết</Button>
            <Button onClick={handleAddToCart} variant="danger" size="sm">Thêm vào giỏ hàng</Button>
        </Card.Footer>
        </Card>
    );
};


export default Product;