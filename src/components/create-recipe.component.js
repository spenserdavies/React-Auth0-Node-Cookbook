import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function CreateRecipe(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ name: "", id: 0 });
  const [newDirection, setNewDirection] = useState({ name: "", id: 0 });
  const [directions, setDirections] = useState([]);
  const [serves, setServes] = useState(0);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeIngredients = (e) => {
    e.preventDefault();
    if (newIngredient.name.length > 0) {
      setIngredients(ingredients.concat(newIngredient));
      setNewIngredient((prevState) => ({ ...prevState, name: "", id: 0 }));
    }
  };

  const onChangeDirections = (e) => {
    e.preventDefault();
    if (newDirection.name.length > 0) {
      setDirections(directions.concat(newDirection));
      setNewDirection((prevState) => ({ ...prevState, name: "", id: 0 }));
    }
  };

  const onChangeNewIngredient = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setNewIngredient((prevState) => ({
      ...prevState,
      name: value,
      id: Math.floor(Math.random() * 9999),
    }));
  };
  const onChangeNewDirection = (e) => {
    const value = e.target.value;
    setNewDirection((prevState) => ({
      ...prevState,
      name: value,
      id: Math.floor(Math.random() * 9999),
    }));
  };
  const onChangeServes = (e) => {
    setServes(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      title: title,
      description: description,
      ingredients: ingredients,
      directions: directions,
      serves: serves,
      userId: user.sub,
    };

    console.log(recipe);

    axios
      .post("http://localhost:5000/recipes/", recipe)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((i) => i.id !== id));

    // forceUpdate();
  };
  const removeDirection = (id) => {
    setDirections(directions.filter((i) => i.id !== id));

    // forceUpdate();
  };

  const { user } = useAuth0();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT HALF */}
        <div className="col-11 col-lg-5 mx-auto border-right border-secondary">
          <div className="row">
            <div className="col col-lg-5 mb-3 mx-auto text-center border-bottom border-secondary">
              <h2>New Recipe</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-11 col-lg-6">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>
            </div>
            <div className="col-11 col-lg-6">
              <div className="row">
                <span>Serves Up To:</span>
              </div>
              <div className="row mt-2 d-flex align-items-center">
                <input
                  type="text"
                  name="serves"
                  className="form-control w-25 mr-3"
                  value={serves}
                  onChange={onChangeServes}
                />
                <span>People</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-11 ml-3">
              <div className="row">
                <span className="text-left">Description</span>
              </div>
              <div className="row">
                <textarea
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-11">
              <div className="form-group form-inline w-100">
                <div className="row w-100 mb-2 ml-0">
                  <label>Ingredients</label>
                </div>
                <div className="input-group w-100">
                  <input
                    type="text"
                    name="ingredient"
                    className="form-control"
                    value={newIngredient.name}
                    onChange={onChangeNewIngredient}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary float-right mx-2"
                      onClick={onChangeIngredients}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4>Ingredients List:</h4>
            </div>
          </div>
          <div
            className="row"
            id="ingredients-list"
            style={{ maxHeight: "50vh", overflowY: "scroll" }}
          >
            {ingredients.map(function (ingredient, index) {
              return (
                <div className="col-5 mx-3" key={ingredient.id}>
                  <div className="row my-4 d-flex justify-content-center align-items-center">
                    <div className="col-8">
                      <li className="w-100">
                        {ingredient.name} | {ingredient.id}
                      </li>
                    </div>
                    <div className="col-4 text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeIngredient(ingredient.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT HALF */}
        <div className="col-11 col-lg-7">
          <div className="row">
            <div className="col-12">
              <div className="form-group form-inline w-100">
                <div className="row w-100 mb-2 ml-0">
                  <label>Add Directions</label>
                </div>
                <h4>{directions.length + 1}.</h4>
                <input
                  type="text"
                  name="direction"
                  className="form-control w-75 ml-2"
                  value={newDirection.name}
                  onChange={onChangeNewDirection}
                />
                <button
                  className="btn btn-dark float-right mx-2"
                  onClick={onChangeDirections}
                >
                  Next Step
                </button>
                <br />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4>Directions:</h4>
            </div>
          </div>
          <div
            className="row"
            style={{ maxHeight: "70vh", overflowY: "scroll" }}
          >
            {directions.map(function (direction, index) {
              return (
                <div className="col-12" key={direction.id}>
                  <div
                    key={direction.id}
                    className="row my-2 d-flex justify-content-center align-items-center"
                  >
                    <div className="col-10">
                      <p className="w-100 my-auto">
                        {index + 1}. {direction.name}
                      </p>
                    </div>
                    <div className="col-2 text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeDirection(direction.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row text-center w-100 justify-content-end my-4 fixed-bottom">
        <button
          className="btn btn-success btn-lg text-center"
          onClick={onSubmit}
        >
          SAVE TO COOKBOOK
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;
