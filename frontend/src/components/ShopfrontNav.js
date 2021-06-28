import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

/**
 * Main navbar for the website. Pardon the long name - this function cannot
 * conflict with bootstrap's Navbar or Nav
 */
export default function ShopfrontNav() {
  return (
    <Navbar bg="light" expand="sm">
      <Container className="nav-bar">
        <Navbar.Brand className="mr-0">
          <Link to="/" className="nav-link">
            SHOPFRONT
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link className="nav-item">
            <Link to="/shopfront" className="nav-link">
              My Shop
            </Link>
          </Nav.Link>

          <Nav.Link className="nav-item">
            <Link to="/cart" className="nav-link">
              My Cart
            </Link>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
