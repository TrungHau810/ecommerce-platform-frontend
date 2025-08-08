import { useContext, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MyUserContext } from "../configs/Contexts";
import Apis, { authApis, endpoints } from "../configs/Apis";
import cookie from 'react-cookies';


const Login = () => {

    const [, dispatch] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [q] = useSearchParams();
    const [msg, setMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const nav = useNavigate();

    const info = [{
        title: "Tên đăng nhập",
        field: "username",
        type: "text"
    }, {
        title: "Mật khẩu",
        field: "password",
        type: "password"
    }];


    const login = async (e) => {
        e.preventDefault();

        try {
            setMsg(null);
            setLoading(true);
            let res = await Apis.post(endpoints['login'], {
                ...user
            });

            cookie.save('token', res.data.token);


            let u = await authApis().get(endpoints['profile']);


            dispatch({
                "type": "login",
                "payload": u.data
            });

            setSuccessMsg("Đăng nhập thành công");

            let next = q.get('next');
            setTimeout(() => {
                nav(next ? next : "/");
            }, 1000);

        } catch (error) {
            console.error(error);
            setMsg(`Tên đăng nhập hoặc mật khẩu không đúng`);

        } finally {
            setLoading(false);

        }
    }

    return (
        <>
            <Card
                className="justify-content-center"
                style={{ maxWidth: 400, margin: "40px auto" }}
            >
                <Card.Body>
                    <h3 className="text-center mt-4 mb-4">Đăng nhập</h3>
                    {msg ? <Alert variant="danger">{msg}</Alert> : <></>}
                    {successMsg && <Alert variant="info">{successMsg}</Alert>}
                    <Form onSubmit={login}>
                        {info.map(i =>
                            <Form.Control
                                onChange={e => setUser({ ...user, [i.field]: e.target.value })}
                                className="mt-3 mb-1"
                                key={i.field}
                                type={i.type}
                                placeholder={i.title}
                                required
                            />)
                        }
                        <div className="d-grid mt-3 mb-1">
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    "Đăng nhập"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card >
        </>
    );
};

export default Login;