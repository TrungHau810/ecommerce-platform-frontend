import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
                            <Link className="nav-link" href="#action/3.1">Action</Link>
                            <Link className="nav-link" href="#action/3.1">Action</Link>
                            <Link className="nav-link" href="#action/3.2">Another action</Link>
                            <Link className="nav-link" href="#action/3.3">Something</Link>
                            <Link className="nav-link" href="#action/3.4">Separated link</Link>
                        </NavDropdown>
                        <Link to="/login" className="nav-link">Đăng nhập</Link>
                        <Link to="/register" className="nav-link">Đăng ký</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;