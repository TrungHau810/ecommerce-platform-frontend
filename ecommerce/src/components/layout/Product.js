import { Button, Card, Col } from "react-bootstrap";


const Product = ({ product }) => {
    return (
        <>
            <Card className="h-100 shadow-sm">
                <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title className="text-center">{product.name}</Card.Title>
                    <Card.Text style={{ minHeight: '60px' }}>
                        {product.description}
                    </Card.Text>
                    <Card.Text className="fw-bold text-danger">{product.price} VNĐ</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <Button variant="primary" size="sm">
                        Xem chi tiết
                    </Button>
                    <Button variant="danger" size="sm">
                        Thêm vào giỏ hàng
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
}

export default Product;