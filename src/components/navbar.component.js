import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal, Button } from "react-bootstrap";
import UnitComponent from "./unit.component";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isAuthenticated, user } = useAuth0();
  let createButton;
  let favoritesButton;
  let expanded = false;
  let expand;

  if (isAuthenticated) {
    createButton = (
      <li className="navbar-item">
        <Link to="/create" className="nav-link">
          Make Recipe
        </Link>
      </li>
    );
    if (user) {
      let favoriteURL = `/favorites/${user.sub}`;
      favoritesButton = (
        <li className="navbar-item">
          <Link to={favoriteURL} className="nav-link">
            Favorites
          </Link>
        </li>
      );
    }
  }

  const toggleExpand = () => {
    console.log(expanded);
    expanded = !expanded;
    console.log(expanded);
    if (expanded === true) {
      expand = (
        <div className="row">
          <div className="col-12">
            <h1>TEST</h1>
          </div>
        </div>
      );
    } else {
      expand = null;
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <Link to="/" className="navbar-brand">
          CookBook
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Recipes
              </Link>
            </li>
            {createButton}
            {favoritesButton}
          </ul>
          <button className="btn btn-light mx-2" onClick={handleShow}>
            Convert Units
          </button>
          <LoginButton />
          <LogoutButton />
        </div>
      </nav>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <div>
            <UnitComponent />
            <div className="text-center w-100">=</div>
            <UnitComponent />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navbar;
