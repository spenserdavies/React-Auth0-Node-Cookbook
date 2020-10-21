import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  let createButton;
  if (isAuthenticated) {
    createButton = (
      <li className="navbar-item">
        <Link to="/create" className="nav-link">
          Make Recipe
        </Link>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
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
        </ul>
        <LoginButton />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
