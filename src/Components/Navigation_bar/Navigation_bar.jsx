import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './Navigation_bar.css';
import { Link } from 'react-router-dom';
import Categories from "../Categories/Categories.jsx";
import About from "../About/About.jsx";


export default function Navigation_bar() {
    return (
        <Navbar expand="lg" className="test-navbar w-100 sticky-top" style={{ backgroundColor: "white" }}>
            <Container fluid className="w-100 d-flex align-items-center">
                {/* Бургер */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Логотип */}
                <Navbar.Brand href="/" className="me-auto ms-3">
                    <img
                        src="img/logo.png"
                        height="40"
                        className="m-2"
                        alt="Rondo logo"
                    />
                </Navbar.Brand>

                {/* Корзина — всегда справа */}
                <Nav className="d-flex align-items-center order-lg-3 ms-auto">
                    <Nav.Link as={Link} to="/cart">
                        <img style={{ width: "40px" }} src="/img/basket2.png" alt="Корзина" />
                    </Nav.Link>
                </Nav>

                {/* Меню */}
                <Navbar.Collapse id="basic-navbar-nav" className="order-lg-2">
                    <Nav className="w-100 justify-content-center justify-content-lg-between menu_contain">
                        <Nav.Link as={Link} to="/">main</Nav.Link>
                        <Nav.Link as={Link} to="/categories">categories</Nav.Link>
                        <Nav.Link as={Link} to="/about">about</Nav.Link>
                        <Nav.Link as={Link} to="/admin">admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

