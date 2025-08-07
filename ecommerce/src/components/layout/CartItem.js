import { Button, Col, Image, InputGroup, Row } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";


const CartItem = ({ product }) => {

    return (
        <>
            <Row className="align-items-center border-bottom py-3">
                <Col xs={2}>
                    <Image src={product.image} thumbnail />
                </Col>

                <Col xs={3}>
                    <div className="fw-semibold">{product.name}</div>
                    <div className="text-danger fw-bold">{product.price.toLocaleString()} VNĐ</div>
                </Col>

                <Col xs={3}>
                    <InputGroup>
                        <Button variant="outline-secondary">
                            <FaMinus />
                        </Button>
                        <span className="mx-2 align-self-center">{product.quantity}</span>
                        <Button variant="outline-secondary">
                            <FaPlus />
                        </Button>
                    </InputGroup>
                </Col>

                <Col xs={2} className="text-end">
                    <Button variant="danger">
                        <FaTrash />
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default CartItem;