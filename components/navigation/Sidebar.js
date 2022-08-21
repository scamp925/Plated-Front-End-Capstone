import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import { signOut } from '../../utils/auth';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        <span className="navbar-toggler-icon" />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Plated</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/">
                Add a Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/" onClick={signOut}>
                Logout
              </Link>
            </li>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
