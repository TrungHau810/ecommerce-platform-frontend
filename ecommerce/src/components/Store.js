import { useEffect, useState } from "react";
import Apis, { endpoints } from "../configs/Apis";
import { useParams } from "react-router-dom";
import Product from "./layout/Product";
import { Col, Container, Image, Row } from "react-bootstrap";

const Store = () => {

    const { id } = useParams();
    const [store, setStore] = useState([]);
    const [products, setProducts] = useState([]);

    const loadStore = async () => {
        let res = await Apis.get(endpoints['stores-detail'](id));
        setStore(res.data);
    }

    const loadProductOfStore = async () => {
        let res = await Apis.get(endpoints['products-store'](id));
        setProducts(res.data);
    }

    useEffect(() => {
        loadStore();
        loadProductOfStore();
    }, []);

    return (
        <>
            <Container className="my-4">
                {/* Thông tin cửa hàng */}
                <Row className="mb-4 align-items-center">
                    <Col xs={12} md={4} className="text-center mb-3">
                        <Image
                            src={store.avatar}
                            alt={store.name}
                            roundedCircle
                            fluid
                            style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                    </Col>
                    <Col xs={12} md={8}>
                        <h2>{store.name}</h2>
                        <p>{store.description}</p>
                    </Col>
                </Row>

                {/* Danh sách sản phẩm */}
                <Row className="g-4 justify-content-center">
                    {products.map(product => (
                        <Col key={product.id} md={2}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Store;