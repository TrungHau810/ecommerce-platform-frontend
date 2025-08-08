import { use, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { authApis, endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";


const RegisterCompany = () => {

    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState({
        type: "TYPE_DN",
    });
    const [msg, setMsg] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany((company) => ({ ...company, [name]: value }));
    }
    const nav = useNavigate();

    const RegisterCompany = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let formData = new FormData();
            for (let key in company) {
                formData.append(key, company[key]);
            }
            formData.append("avatar", e.target.avatar.files[0]);
            formData.append("type", company.type);

            let res = await authApis().post(endpoints['my-company'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(res.data);

            if (res.status === 201) {
                console.log("Đăng ký thành công");
                setMsg("Đăng ký doanh nghiệp/tiểu thương thành công");
                setTimeout(() => {
                    nav("/");
                }, 1000);
            }

        } catch (error) {
            console.error(error);
            setMsg("Đăng ký doanh nghiệp/tiểu thương thất bại");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <Container className="my-5 d-flex justify-content-center">
                <Card style={{ maxWidth: "700px", width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">🏢 Đăng ký Doanh nghiệp / Tiểu thương</h2>
                        {msg && <Alert variant={msg.type}>{msg.text}</Alert>}

                        <Form onSubmit={RegisterCompany}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Tên doanh nghiệp</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập tên..."
                                            name="name"
                                            value={company.name || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="tax">
                                        <Form.Label>Mã số thuế</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập mã số thuế..."
                                            name="tax"
                                            value={company.tax || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="type">
                                <Form.Label>Loại hình doanh nghiệp</Form.Label>
                                <Form.Select name="type" value={company.type} onChange={handleChange} required                                >
                                    <option value="TYPE_DN">Doanh nghiệp</option>
                                    <option value="TYPE_TT">Tiểu thương</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="avatar">
                                <Form.Label>Ảnh đại diện</Form.Label>
                                <Form.Control type="file" accept="image/*" name="avatar" />
                            </Form.Group>

                            <div className="text-center">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={loading}
                                    style={{ minWidth: "150px" }}
                                >{loading ? (<><Spinner size="sm" animation="border" /> Đang xử lý...</>) : ("Đăng ký")}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default RegisterCompany;