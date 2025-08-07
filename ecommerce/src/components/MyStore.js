import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";


const MyStore = () => {

    const [myStore, setMyStore] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadMyStore = async () => {
        try {
            setLoading(true);
            let res = await authApis().get(endpoints['my-store']);
            setMyStore(res.data);

        } catch (error) {

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        loadMyStore();
    }, [])


    return (
        <>
            <Container className="mt-4">
                {loading ? <>
                    <Container className="text-center mt-5">
                        <Spinner animation="border" role="status" />
                        <p className="mt-2">Đang tải cửa hàng...</p>
                    </Container>
                </> : <>

                    <h1 className="mb-4">Đây là cửa hàng của tôi</h1>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Card>
                                <Card.Img variant="top" src={myStore.avatar} alt={myStore.name} />
                                <Card.Body>
                                    <Card.Title>{myStore.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Mô tả:</strong> {myStore.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>}

                {myStore.length === 0 && <>
                    <h1>Bạn chưa có cửa hàng nào</h1>
                </>}
            </Container>
        </>
    );
}

export default MyStore;