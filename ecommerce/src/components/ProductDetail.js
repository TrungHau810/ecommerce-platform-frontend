import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import { use, useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { MyUserContext } from "../configs/Contexts";

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [user, dispatch] = useContext(MyUserContext);



    const loadProductDetail = async () => {
        let res = await Apis.get(endpoints['product-detail'](id));
        setProduct(res.data);
    }

    const loadReviews = async () => {
        let res = await Apis.get(endpoints['reviews-product'](id));
        setReviews(res.data);
    }

    useEffect(() => {
        loadProductDetail();
        loadReviews();
    }, []);


    return (
        <>
            <Card className="mb-4">
                <Row className="g-0">
                    <Col md={4}>
                        <Image src={product.image} alt={product.name} fluid rounded />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title as="h2">{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text className="fw-bold text-danger">
                                Giá: {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(product.price)}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <h3>Đánh giá sản phẩm</h3>
            {reviews.length === 0 ? (
                <p>Chưa có đánh giá nào.</p>
            ) : (
                reviews.map(r => (
                    <Card className="mb-3" key={r.id}>
                        <Card.Body>
                            <Card.Title>⭐ {r.rate}/5</Card.Title>
                            <Card.Text>{r.content}</Card.Text>
                            {r.image && (
                                <Image
                                    src={r.image}
                                    alt="Review"
                                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                                    rounded
                                />
                            )}
                            <Card.Text className="text-muted mt-2">
                                Ngày tạo: {new Date(r.createdDate).toLocaleDateString('vi-VN')}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}

            {!user ? <Alert variant="danger">Đăng nhập để được đánh giá</Alert> :
                <Form className="mb-4">
                    <Form.Group className="mb-2">
                        <Form.Label>Nội dung đánh giá</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            // value={content}
                            // onChange={e => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Chấm sao (1 - 5)</Form.Label>
                        <Form.Select>
                            {[5, 4, 3, 2, 1].map(i => (
                                <option key={i} value={i}>{i} sao</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh (tuỳ chọn)</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                        // onChange={e => setFile(e.target.files[0])}
                        />
                    </Form.Group>

                    <Button type="submit" variant="success">Gửi đánh giá</Button>
                </Form>

            }

        </>
    );

};

export default ProductDetail;