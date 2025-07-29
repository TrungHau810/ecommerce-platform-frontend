import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";


const Login = () => {

    const info = [{
        title: "Tên đăng nhập",
        field: "username",
        type: "text"
    }, {
        title: "Mật khẩu",
        field: "password",
        type: "password"
    }];

    return (
        <>
            <Card
                className="justify-content-center"
                style={{ maxWidth: 400, margin: "40px auto" }}
            >
                <Card.Body>
                    <h3 className="text-center mt-4 mb-4">Đăng nhập</h3>
                    <Alert variant="danger">Test lỗi nè</Alert>
                    <Alert variant="info">Test info</Alert>
                    <Form>
                        {info.map(i =>
                            <Form.Control
                                // onChange={}
                                className="mt-3 mb-1"
                                key={i.field}
                                type={i.type}
                                placeholder={i.title}
                                required
                            />)
                        }
                        <div className="d-grid">
                            <Button type="submit" variant="primary" className="mt-3 mb-1">
                                <Spinner size="sm" />
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card >
        </>
    );
};

export default Login;