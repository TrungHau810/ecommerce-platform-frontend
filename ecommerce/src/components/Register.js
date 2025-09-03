import { useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";


const Register = (role) => {

    const [user, setUser] = useState({
        role: role
    });
    const [avatar, setAvatar] = useState(null);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const info = [{
        "title": "Họ tên",
        "field": "fullname",
        "type": "text"
    }, {
        "title": "Số điện thoại",
        "field": "number_phone",
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

    const validate = () => {
        console.log("password ", user.password);
        if (user.password === null || user.password === undefined) {
            setMsg("Mật khẩu không được để trống");
            return false;
        }
        if (user.confirm !== user.password) {
            setMsg("Mật khẩu không khớp");
            return false;
        }
        return true;
    }

    const register = async (e) => {
        e.preventDefault();
        console.log(validate());

        if (validate()) {

            try {
                setLoading(true);
                let formData = new FormData();
                console.log(user);
                for (let key in user) {
                    if (key !== "confirm")
                        formData.append(key, user[key]);
                }
                if (avatar) {
                    console.error("Ê nha ", avatar);
                    formData.append("avatar", avatar);
                }

                for (let [key, value] of formData.entries()) {
                    if (key === "avatar" && value instanceof File) {
                        console.log(`${key}:`, value.name);  // In ra tên file avatar
                    } else {
                        console.log(`${key}:`, value);
                    }
                }


                let res = await Apis.post(endpoints["register"], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (res.status === 201) {
                    nav("/login");
                } else {
                }
            } catch (error) {
                setMsg("Đăng ký tài khoản thất bại");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    const renderForm = (roleLabel, variant) => (
        <>
            {msg && <Alert variant="danger" > {msg}</Alert>}
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
                                    role: roleLabel === "buyer" ? "ROLE_CUSTOMER" : "ROLE_SELLER",
                                }))
                            }
                        />
                    </Form.Group>
                ))}
                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Ảnh đại diện</Form.Label>
                    <Form.Control type="file" onChange={(e) => setAvatar(e.target.files[0])} />
                </Form.Group>

                <Button variant={variant} type="submit" className="w-100" disabled={loading}>
                    {loading ? (<>
                        <Spinner animation="border" size="sm" className="me-2" />Đang xử lý...</>
                    ) : (`Đăng ký ${roleLabel === "buyer" ? "người mua" : "người bán"}`)}
                </Button>

            </Form>
        </>
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