import { useContext, useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MyUserContext } from "../configs/Contexts";
import Apis, { endpoints } from "../configs/Apis";
import cookie from 'react-cookies';


const Login = () => {

    const [, dispatch] = useContext(MyUserContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [q] = useSearchParams();
    const [msg, setMsg] = useState(null);

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
            setLoading(true);
            let res = await Apis.post(endpoints['login'], {
                ...user
            });
            console.log(res.data);
            cookie.save('token', res.data.user.token);

            console.log(cookie.token);


            dispatch({
                "type": "login",
                "payload": res.data.user
            });

            
            let next = q.get('next');
            nav(next ? next : "/");

        } catch (error) {
            console.error(error);
            setMsg(`Đăng nhập thất bại! <br> Vui lòng kiểm tra lại thông tin đăng nhập`);

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
                    {/* <Alert variant="info">Test info</Alert> */}
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