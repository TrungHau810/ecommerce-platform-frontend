import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";

const Home = () => {

    const [stores, setStores] = useState([]);

    const loadStores = async () => {
        let res = await Apis.get(endpoints["stores"]);
        console.log(res.data);
        setStores(res.data);
    }

    useEffect(() => {
        loadStores();
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


            <Row xs={1} md={2} lg={3} className="g-4">
                {stores.map((store) => (
                    <Col key={store.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img variant="top" src={store.avatar} />
                            <Card.Body>
                                <Card.Title className="text-center">{store.name}</Card.Title>
                                <Card.Text>{store.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Button variant="primary">Xem cửa hàng</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://res.cloudinary.com/tthau2004/image/upload/v1753458359/keodeochupachups_zkjvsk.jpg" />
                <Card.Body>
                    <Card.Title className="text-center">Kẹo Chupa Chups</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Card.Footer>
                        <Button variant="primary">Xem chi tiết  </Button>
                        <Button variant="danger">Thêm vào giỏ hàng</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </>

    );
}

export default Home;