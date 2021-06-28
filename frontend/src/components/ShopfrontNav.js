import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

export default function ShopfrontNav() {
  return (
    <Navbar bg="dark" expand="lg" className="nav-bar">
      <Container style={{ justifyContent: 'flex-start' }}>
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            Shopfront
          </Link>
        </Navbar.Brand>
        <Nav.Link>
          <Link to="/shopfront" className="nav-link">
            My Shop
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/cart" className="nav-link">
            My Cart
          </Link>
        </Nav.Link>
      </Container>
    </Navbar>
  )
}
