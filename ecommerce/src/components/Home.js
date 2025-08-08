import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { useNavigate, useSearchParams } from "react-router-dom";
import Product from "./layout/Product";
import { MyUserContext } from "../configs/Contexts";
import cookie from 'react-cookies';
import Company from "./Company";


const Home = () => {

    const [stores, setStores] = useState([]);
    const [user,] = useContext(MyUserContext);
    const [products, setProducts] = useState([]);
    const [storeParam, setStoreParam] = useState("");
    const [productParam, setProductParam] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const loadStores = async () => {

        try {
            setLoading(true);
            let url = `${endpoints['stores']}?kw=${storeParam}`;
            let res = await Apis.get(url);
            setStores(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const loadProducts = async () => {

        try {
            setLoading(true);
            let url = `${endpoints['products']}?kw=${productParam}&page=${page}`;
            let res = await Apis.get(url);
            console.log(url);
            console.error(productParam);
            setProducts(res.data);

            if (res.data.length == 0 && page > 1)
                page = 0;
            else {
                if (page <= 1)
                    setProducts(res.data);
                else
                    setProducts([...products, ...res.data]);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const loadMore = () => {
        setPage(page + 1);
    }


    useEffect(() => {
        let timer = setTimeout(() => {
            if (page > 0)
                loadProducts();
        }, 500);

        return () => clearTimeout(timer);
    }, [productParam, page]);

    useEffect(() => {
        setPage(1);
    }, [productParam]);

    useEffect(() => {
        let timer = setTimeout(() => {
            loadStores();
        }, 500)

        return () => clearTimeout(timer);
    }, [storeParam]);

    return (
        <>
            {!user || (user && user.role != "ROLE_SELLER") ? <>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tìm kiếm cửa hàng</Form.Label>
                        <Form.Control type="text" onChange={e => setStoreParam(e.target.value)} placeholder="Nhập tên cửa hàng..." />
                    </Form.Group>
                </Form>

                {loading && (
                    <div className="text-center my-3">
                        <Spinner variant="info" animation="border" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </Spinner>
                    </div>
                )}

                <Row xs={1} md={2} lg={3} className="g-3">
                    {stores.length === 0 ? <>
                        <Alert variant="info">Không tìm thấy cửa hàng với từ khoá {storeParam}</Alert>
                    </> : <>
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
                        ))}</>}
                </Row>

                <h3 className="mt-2 mb-3 text-center"> Danh sách các sản phẩm</h3>

                <Form className="mb-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tìm kiếm sản phẩm</Form.Label>
                        <Form.Control type="text" onChange={e => setProductParam(e.target.value)} placeholder="Nhập sản phẩm..." />
                    </Form.Group>
                </Form>

                {loading && (
                    <div className="text-center my-3">
                        <Spinner variant="info" animation="border" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </Spinner>
                    </div>
                )}

                <Row xs={1} md={2} lg={4} className="g-4">
                    {products.length === 0 && productParam != "" ? <>
                        <Alert variant="info">Không tìm thấy sản phẩm với từ khoá {productParam}</Alert>
                    </> : <>
                        {products.map((product) => (<Product key={product.id} product={product} />))}
                    </>}
                </Row>
                {products.length === 0 && productParam === "" && <><Alert variant="info">Không có sản phẩm</Alert></>}

                {page > 0 && <div className="mt-2 mb-2 text-center">
                    <Button variant="primary" onClick={loadMore}>Xem thêm...</Button>
                </div>}
            </> : <></>}

            {user && user.role === "ROLE_SELLER" ? <>
                <Company />
            </> : <></>}

        </>

    );
}

export default Home;