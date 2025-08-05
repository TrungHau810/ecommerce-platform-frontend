import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MyUserContext } from "../../configs/Contexts";
import Apis, { endpoints } from "../../configs/Apis";


const Header = () => {

    const [categories, setCategories] = useState([]);
    const [user, dispatch] = useContext(MyUserContext);

    const loadCategories = async () => {
        let res = await Apis.get(endpoints['categories']);
        console.log(res.data);
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
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Danh mục" id="basic-nav-dropdown">
                            {categories.map(cate =>
                                <Link className="nav-link" href="#action/3.1">{cate.name}</Link>
                            )}
                        </NavDropdown>
                        <Link to="/cart"><FaShoppingCart /></Link>
                    </Nav>

                    <Nav className="ms-auto">
                        {user === null ? (
                            <>
                                <Link to="/login" className="nav-link">Đăng nhập</Link>
                                <Link to="/register" className="nav-link">Đăng ký</Link>
                            </>
                        ) : (
                            <Button className="ms-2" variant="outline-danger"
                                onClick={() => dispatch({ type: "logout" })}>Đăng xuất</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;