import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Electricity board</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/">Applications</NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
