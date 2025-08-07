import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './Navigation_bar.css';
import { Link } from 'react-router-dom';
import Categories from "../Categories/Categories.jsx";
import About from "../About/About.jsx";


export default function Navigation_bar() {
    return (
        <Navbar expand="lg" className=" w-100 sticky-top" style={{backgroundColor: "white" }}>
            <Container fluid className="w-100">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href="/" className="me-5">
                    <img
                        src="img/logo.png"
                        height="40"
                        className="m-2"
                        alt="Rondo logo"
                    />
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav className="me-auto w-100 justify-content-between menu_contain" >
                        <Nav.Link as={Link} to="/">main</Nav.Link>
                        <Nav.Link as={Link} to="/categories">categories</Nav.Link>
                        <Nav.Link as={Link} to="/about">about</Nav.Link>
                        <Nav.Link as={Link} to="/admin">admin</Nav.Link>
                        <Nav.Link as={Link} to="/cart"><img style={{width:"50px"}} src="/img/basket2.png" alt=""/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

