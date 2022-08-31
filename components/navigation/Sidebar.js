import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link';
import { signOut } from '../../utils/auth';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const toggleShow = () => setShow((s) => !s);
  const offCanvasRef = useRef();
  const closeOffCanvas = () => offCanvasRef.current.backdrop.click();

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        <span className="navbar-toggler-icon" />
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link passHref href="/" onClick={closeOffCanvas}>
              <h1>Plated</h1>
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/recipes/recipes" onClick={closeOffCanvas}>
                <h3>Recipes</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/recipes/new" onClick={closeOffCanvas}>
                <h3>Add Recipe</h3>
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
