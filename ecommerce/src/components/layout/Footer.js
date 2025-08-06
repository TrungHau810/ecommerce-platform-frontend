import { Alert, Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <div className="bg-info pt-3">
                <Container>
                    <Row>
                        <Col md={3}>
                            <h4 className="text-white fw-bold">
                                <span style={{ backgroundColor: '#00a8fdff', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>Open Mall</span>
                            </h4>
                            <p className="mt-3">Sàn thương mại điện tử phổ biến số 1 tại Việt Nam</p>
                        </Col>

                        <Col md={3}>
                            <h5 className="text-black fw-bold mb-3">Bạn cần hỗ trợ</h5>
                            <p><strong>1900 6750</strong></p>
                            <p>Địa chỉ: TP. Thủ Đức, TP. Hồ Chí Minh</p>
                            <p>Email: support@ou.edu.vn</p>
                            <div className="d-flex gap-2 mb-3">

                            </div>
                            <div className="d-flex gap-2 flex-wrap">
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="stripe" width="40" />
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="momo" width="40" />
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="paypal" width="40" />
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="apple pay" width="40" />
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="visa" width="40" />
                            </div>
                        </Col>

                        <Col md={3}>
                            <h5 className="text-white fw-bold mb-3">Hướng dẫn mua hàng</h5>
                            <ul className="list-unstyled">
                                <li>Trang chủ</li>
                                <li>Giới thiệu</li>
                                <li>Danh mục</li>
                                <li>Tin tức</li>
                                <li>Hướng dẫn sử dụng</li>
                            </ul>
                        </Col>

                        <Col md={3}>
                            <h5 className="text-white fw-bold mb-3">Hỗ trợ khách hàng</h5>
                            <ul className="list-unstyled">
                                <li>Trang chủ</li>
                                <li>Giới thiệu</li>
                                <li>Danh mục</li>
                                <li>Tin tức</li>
                                <li>Hướng dẫn sử dụng</li>
                            </ul>
                        </Col>
                    </Row>
                    <hr className="border-light mt-4" />
                    <p className="text-center mb-0">© 2025 - Bản quyền thuộc về Open Mall</p>
                </Container>
            </div>
        </>
    );
}

export default Footer;