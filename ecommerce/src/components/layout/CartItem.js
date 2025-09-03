import { Button, Col, Image, InputGroup, Row } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";



const CartItem = ({item, onUpdateQuantity, onRemove}) => {


    return (
        <>
            <Row className="align-items-center border-bottom py-3">
                <Col xs={2}>

                    <Image src={item.image} thumbnail />
                </Col>

                <Col xs={3}>
                    <div className="fw-semibold">{item.name}</div>
                    <div className="text-danger fw-bold">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </div>

                </Col>

                <Col xs={3}>
                    <InputGroup>

                        <Button
                            variant="outline-secondary"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                            <FaMinus />
                        </Button>
                        <span className="px-3 py-2 border">{item.quantity}</span>
                        <Button 
                            variant="outline-secondary"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >

                            <FaPlus />
                        </Button>
                    </InputGroup>
                </Col>
                
                <Col xs={2} className="text-end">
                    <div className="fw-bold">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                    </div>
                </Col>

                <Col xs={2} className="text-end">

                    <Button variant="danger" onClick={() => onRemove(item.id)}>

                        <FaTrash />
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default CartItem;