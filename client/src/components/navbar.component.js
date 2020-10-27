import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal, Button } from "react-bootstrap";
import UnitComponent from "./unit.component";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [units, setUnits] = useState([
    "teaspoon",
    "tablespoon",
    "cup",
    "pint",
    "quart",
    "gallon",
  ]);
  const [toUnit, setToUnit] = useState(units[1]);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [amount, setAmount] = useState(1);
  const [amountInFromUnit, setAmountInFromUnit] = useState(true);
  const [convertTo, setConvertTo] = useState({
    ////// USE convertTo[toUnit][fromUnit] to get the rate
    teaspoon: {
      teaspoon: 1,
      tablespoon: 3, // 1 tablespoon is 3 teaspoons
      cup: 48, // 1 cup is 48 teaspoons
      pint: 96, // 1 pint is 96 teaspoons
      quart: 192, // 1 quart is 192 teaspoons
      gallon: 768, // 1 gallon is 768 teaspoons
    },
    tablespoon: {
      teaspoon: 1 / 3, // 1 teaspoon is 1/3 of a tablespoon
      tablespoon: 1,
      cup: 16, // 1 cup is 16 tablespoons
      pint: 32, // 1 pint is 32 tablespoons
      quart: 64, // 1 quart is 64 tablespoons
      gallon: 256, // 1 gallon is 256 tablespoons
    },
    cup: {
      teaspoon: 1 / 48, // 1 teaspoon is 1/48 of a cup
      tablespoon: 1 / 16, // 1 tablespoon is 1/16 of a cup
      cup: 1,
      pint: 2, // 1 pint is 2 cups
      quart: 4, // 1 quart is 4 cups
      gallon: 16, // 1 gallon is 16 cups
    },
    pint: {
      teaspoon: 1 / 96,
      tablespoon: 1 / 32,
      cup: 1 / 2,
      pint: 1,
      quart: 2,
      gallon: 8,
    },
    quart: {
      teaspoon: 1 / 192,
      tablespoon: 1 / 64,
      cup: 1 / 4,
      pint: 1 / 2,
      quart: 1,
      gallon: 4,
    },
    gallon: {
      teaspoon: 1 / 768,
      tablespoon: 1 / 256,
      cup: 1 / 16,
      pint: 1 / 8,
      quart: 1 / 4,
      gallon: 1,
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let toAmount, fromAmount;
  if (amountInFromUnit) {
    fromAmount = amount;
    toAmount = (amount * convertTo[toUnit][fromUnit]).toFixed(4);
  } else {
    fromAmount = amount;
    toAmount = (amount * convertTo[fromUnit][toUnit]).toFixed(4);
  }

  const { isAuthenticated, user } = useAuth0();
  let createButton;
  let favoritesButton;

  if (isAuthenticated) {
    createButton = (
      <li className="navbar-item">
        <Link to="/create" className="nav-link">
          New
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

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromUnit(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromUnit(false);
  }

  function resetUnits() {
    setToUnit(units[1]);
    setFromUnit(units[0]);
    setAmount(1);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <Link to="/" className="navbar-brand">
          CookBook
        </Link>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            {createButton}
            {favoritesButton}
            <li className="navbar-item">
              <Link to="/conversion-chart" className="nav-link">
                Conversions
              </Link>
            </li>
          </ul>
          <button className="btn btn-light btn-sm mx-2" onClick={handleShow}>
            Converter
          </button>
          <LoginButton />
          <LogoutButton />
        </div>
      </nav>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Convert Units of Volume</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <div>
            <UnitComponent
              unitOptions={units}
              selectedUnit={fromUnit}
              onChangeUnit={(e) => setFromUnit(e.target.value)}
              amount={fromAmount}
              onChangeAmount={handleFromAmountChange}
            />
            <div className="text-center w-100">=</div>
            <UnitComponent
              unitOptions={units}
              selectedUnit={toUnit}
              onChangeUnit={(e) => setToUnit(e.target.value)}
              amount={toAmount}
              onChangeAmount={handleToAmountChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={resetUnits}>
            Reset
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navbar;
