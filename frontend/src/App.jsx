import { Suspense } from "react";

import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { APP_NAME } from "./statics";
import { Button } from "react-bootstrap";

export const App = () => {
  return (
    <>
      <div className="container py-2">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center border-bottom shadow">
            <a
              href="/"
              className="d-flex align-items-center link-body-emphasis text-decoration-none"
            >
              <img src="/logo_3.png" alt="" width="64" height="100%" />
              <span className="fs-4">{APP_NAME}</span>
            </a>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <Link
                to="#"
                className="me-3 py-2 link-body-emphasis text-decoration-none"
              >
                Features
              </Link>
              <Link
                to="#"
                className="me-3 py-2 link-body-emphasis text-decoration-none"
              >
                Pricing
              </Link>
              <Link
                to="#"
                className="me-3 py-2 link-body-emphasis text-decoration-none"
              >
                Support
              </Link>
              <Button variant="primary" className="mx-2">
                Login / Register
              </Button>
            </nav>
          </div>
        </header>
      </div>

      {/* <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        bg="primary"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/lists">
                My Notes
              </Nav.Link>
              <Nav.Link
                href="https://forms.gle/rQkyMrvbeACoFTny9"
                target="_blank"
              >
                Isi Survey
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/app">
                Login / Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Container>
      <footer className="my-5 pt-5 text-body-secondary text-center text-small">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} {APP_NAME}
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Support</a>
          </li>
        </ul>
      </footer>
    </>
  );
};
