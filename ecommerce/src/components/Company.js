import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../configs/Contexts";
import { authApis, endpoints } from "../configs/Apis";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Container } from "react-bootstrap";


const Company = () => {
    const [company, setCompany] = useState([]);
    const [user,] = useContext(MyUserContext);

    const loadMyCompany = async () => {
        let res = await authApis().get(endpoints['my-company']);
        setCompany(res.data);
    }

    useEffect(() => {
        loadMyCompany();
    }, [user]);

    return (
        <>
            {!user && <Alert variant="warning">Bạn cần phải đăng nhập để xem thông tin doanh nghiệp.</Alert>}
            <Container className="my-5 d-flex justify-content-center">
                {company ? (
                    <Card style={{ maxWidth: "500px", width: "100%", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                        <Card.Img
                            variant="top"
                            src={company.avatar}
                            alt={company.name}
                            style={{ height: "250px", objectFit: "cover" }}
                        />
                        <Card.Body>
                            <Card.Title className="text-center">{company.name}</Card.Title>
                            <Card.Text>
                                <strong>Mã số thuế:</strong> {company.tax}
                            </Card.Text>
                            <Card.Text>
                                <strong>Loại hình:</strong>{" "}
                                {company.type === "TYPE_DN"
                                    ? "Doanh nghiệp"
                                    : company.type === "TYPE_TT"
                                        ? "Tiểu thương"
                                        : company.type}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <div className="text-center">
                        <h2>Bạn chưa có doanh nghiệp/tiểu thương đăng ký.</h2>
                        <p> Hãy đăng ký{" "} <Link to="/register-company" style={{ fontWeight: "bold" }}>tại đây</Link></p>
                    </div>
                )}
            </Container>
        </>
    );
}

export default Company;