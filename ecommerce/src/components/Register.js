import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";


const Register = (role) => {

    const [user, setUser] = useState({
        role: role
    });
    const avatar = useRef();
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const info = [{
        "title": "Họ tên",
        "field": "fullName",
        "type": "text"
    }, {
        "title": "Số điện thoại",
        "field": "numberPhone",
        "type": "tel"
    }, {
        "title": "Tên đăng nhập",
        "field": "username",
        "type": "text"
    }, {
        "title": "Mật khẩu",
        "field": "password",
        "type": "password"
    }, {
        "title": "Xác nhận mật khẩu",
        "field": "confirm",
        "type": "password"
    }];

    const register = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        console.log(user);
        for (let key in user) {
            if (key !== "confirm")
                formData.append(key, user[key]);
        }
        if (avatar.current.files.length > 0) {
            formData.append("avatar", avatar.current.files[0]);
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    }

    const renderForm = (roleLabel, variant) => (
        <Form className="pt-2" onSubmit={register}>
            {info.map((item) => (
                <Form.Group className="mb-3" controlId={`${roleLabel}-${item.field}`} key={item.field}>
                    <Form.Label>{item.title}</Form.Label>
                    <Form.Control
                        type={item.type}
                        placeholder={item.title}
                        onChange={(e) =>
                            setUser((prev) => ({
                                ...prev,
                                [item.field]: e.target.value,
                                role: roleLabel === "buyer" ? "ROLE_CUSTOMER" : "ROLE_SELLER", // ✅ Cập nhật role đúng
                            }))
                        }
                    />
                </Form.Group>
            ))}
            <Form.Group className="mb-4">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" ref={avatar} />
            </Form.Group>
            <Button variant={variant} type="submit" className="w-100">
                Đăng ký {roleLabel === "buyer" ? "người mua" : "người bán"}
            </Button>
        </Form>
    );



    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col md="auto" xl="6" className="rounded p-0 border mt-4">
                        <h4 className="text-center py-3 border-bottom mb-0">Đăng ký tài khoản</h4>
                        <Tabs defaultActiveKey="buyer" id="register-tabs" className="mb-3 px-3 pt-3" fill>
                            <Tab eventKey="buyer" title="Người mua" className="p-3">
                                {renderForm("buyer")}
                            </Tab>
                            <Tab eventKey="seller" title="Người bán" className="p-3">
                                {renderForm("seller")}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Register;