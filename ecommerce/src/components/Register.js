import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";


const Register = () => {
    return (
        <>
            <h1 className="text-center">Đăng ký tài khoản</h1>

            <Container>
                <Row className="justify-content-center">
                    <Col md="auto" xl="6" className="rounded p-0 border">
                        <Tabs defaultActiveKey="patient-register" id="fill-tab-example" className="mb-3" fill>
                            <Tab eventKey="patient-register" title="Đăng ký người mua" className="p-3">
                                {/* <RegisterForm userType="patient" /> */}
                            </Tab>
                            <Tab eventKey="doctor-register" title="Đăng ký người bán" className="p-3">
                                {/* <RegisterForm userType="doctor" /> */}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Register;