import { Button, Col, Image, InputGroup, Row } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";


const CartItem = () => {

    return (
        <>
            <Row className="align-items-center border-bottom py-3">

                <Col xs={2}>
                    <Image src="https://res.cloudinary.com/tthau2004/image/upload/v1749721421/fhkzpqxq2jlefwkxklsd.jpg" thumbnail />
                </Col>

                <Col xs={3}>
                    <div className="fw-semibold">Sản phẩm ABC</div>
                    <div className="text-danger fw-bold">150000 VNĐ</div>
                </Col>

                <Col xs={3}>
                    <InputGroup>
                        <Button
                            variant="outline-secondary"
                        >
                            <FaMinus />
                        </Button>

                        <Button variant="outline-secondary">
                            <FaPlus />
                        </Button>
                    </InputGroup>
                </Col>

                <Col xs={2} className="text-end">
                    <Button variant="danger" >
                        <FaTrash />
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default CartItem;