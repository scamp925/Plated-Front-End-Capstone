/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { signOut } from '../../utils/auth';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Link passHref href="/">
              <h1>Plated</h1>
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={toggleMenu} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              restoreFocus={false}
              show={menuOpen}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <h1>Plated</h1>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" onClick={toggleMenu}>
                  <Link passHref href="/">
                    <h3>Home</h3>
                  </Link>
                  <Link passHref href="/mealOptions/" onClick={toggleMenu}>
                    <h3>Recipes</h3>
                  </Link>
                  <Link passHref href="/recipes/new" onClick={toggleMenu}>
                    <h3>Add Recipe</h3>
                  </Link>
                  <Link passHref href="/eatOut/new" onClick={toggleMenu}>
                    <h3>Add Eat Out Option</h3>
                  </Link>
                  <button type="button" className="btn btn-danger" onClick={signOut}>
                    Sign Out
                  </button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
