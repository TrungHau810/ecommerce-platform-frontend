import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";
import Product from "./layout/Product";

const Home = () => {

    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const nav = useNavigate();

    const loadStores = async () => {
        let res = await Apis.get(endpoints["stores"]);
        setStores(res.data);
    }

    const loadProducts = async () => {
        let res = await Apis.get(endpoints['products']);
        setProducts(res.data);
    }

    useEffect(() => {
        loadStores();
        loadProducts();
    }, []);

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tìm kiếm</Form.Label>
                    <Form.Control type="keyword" placeholder="Nhập tên cửa hàng..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


            <Row xs={1} md={2} lg={3} className="g-3">
                {stores.map((store) => (
                    <Col key={store.id}>
                        <Card className="h-100 shadow-sm" style={{ maxWidth: '16rem', margin: '0 auto', fontSize: '0.9rem' }}>
                            <Card.Img
                                variant="top"
                                src={store.avatar}
                                style={{ height: '140px', objectFit: 'cover' }}
                            />
                            <Card.Body style={{ padding: '0.75rem' }}>
                                <Card.Title className="text-center" style={{ fontSize: '1rem' }}>
                                    {store.name}
                                </Card.Title>
                                <Card.Text style={{ minHeight: '40px' }}>{store.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-center bg-white border-0 pb-3">
                                <Button variant="primary" size="sm"
                                    onClick={() => nav(`/store/${store.id}`)}>Xem cửa hàng</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h3 className="mt-2 mb-3 text-center"> Danh sách các sản phẩm</h3>
            <Row xs={1} md={3} className="g-4">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Row>

        </>

    );
}

export default Home;