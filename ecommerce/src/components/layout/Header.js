import { Badge, Button, Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MyCartContext, MyUserContext } from "../../configs/Contexts";
import Apis, { endpoints } from "../../configs/Apis";


const Header = () => {

    const [categories, setCategories] = useState([]);
    const [user, dispatch] = useContext(MyUserContext);
    const [cartCounter, dispatchCartCounter] = useContext(MyCartContext);

    const loadCategories = async () => {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Open Mall</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Trang chủ</Link>
                        {user !== null ? (
                            user.role === "ROLE_CUSTOMER" ? (
                                <>
                                    <NavDropdown title="Danh mục" id="basic-nav-dropdown">
                                        {categories.map((cate, index) => (
                                            <Link key={index} className="dropdown-item" to="#action/3.1">
                                                {cate.name}
                                            </Link>
                                        ))}
                                    </NavDropdown>
                                    <Link to="/cart" className="nav-link">
                                        <FaShoppingCart /><Badge bg="danger">{cartCounter}</Badge>
                                    </Link>

                                    <Link to="/order" className="nav-link">Đơn hàng</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/my-store" className="nav-link">Cửa hàng</Link>
                                    <Link to="/stats" className="nav-link">Thống kê</Link>
                                </>
                            )
                        ) : null}


                    </Nav>

                    <Nav className="ms-auto">
                        {user === null ? (
                            <>
                                <Link to="/login" className="nav-link">Đăng nhập</Link>
                                <Link to="/register" className="nav-link">Đăng ký</Link>
                            </>
                        ) : (
                            <>
                                <span className="me-2">Chào, <strong>{user.fullName}</strong></span>
                                <Image src={user.avatar} roundedCircle width={40} height={40} className="me-2" alt="Avatar" />
                                <Button className="ms-2" variant="outline-danger"
                                    onClick={() => dispatch({ type: "logout" })}>Đăng xuất</Button>
                            </>

                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;