import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class CreateRecipe extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeDirections = this.onChangeDirections.bind(this);
    this.onChangeServes = this.onChangeServes.bind(this);
    this.onChangeNewIngredient = this.onChangeNewIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.removeDirection = this.removeDirection.bind(this);
    this.onChangeNewDirection = this.onChangeNewDirection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      ingredients: [],
      newIngredient: {
        name: "",
        id: 0,
      },
      newDirection: {
        name: "",
        id: 0,
      },
      directions: [],
      serves: null,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeIngredients(e) {
    e.preventDefault();
    if (this.state.newIngredient.name.length > 0) {
      this.setState({
        newIngredient: {
          ...this.state.newIngredient,
          id: Math.floor(Math.random() * 9999),
        },
      });
      this.setState(function (state) {
        state.ingredients.push(state.newIngredient);
      });
      this.setState({
        newIngredient: { name: "", id: 0 },
      });
    }
  }
  onChangeDirections(e) {
    e.preventDefault();
    if (this.state.newDirection.name.length > 0) {
      this.setState({
        newDirection: {
          ...this.state.newDirection,
          id: Math.floor(Math.random() * 9999),
        },
      });
      this.setState(function (state) {
        state.directions.push(state.newDirection);
      });
      this.setState({
        newDirection: { name: "", id: 0 },
      });
    }
  }
  onChangeNewIngredient(e) {
    e.preventDefault();
    this.setState({
      newIngredient: { name: e.target.value },
    });
  }
  onChangeNewDirection(e) {
    this.setState({
      newDirection: { name: e.target.value },
    });
  }
  onChangeServes(e) {
    this.setState({
      serves: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const recipe = {
      title: this.state.title,
      description: this.state.description,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
      serves: this.state.serves,
    };

    console.log(recipe);

    axios
      .post("http://localhost:5000/recipes/", recipe)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  removeIngredient(index) {
    console.log(index);
    this.setState(function (state) {
      state.ingredients.splice(index, 1);
    });
    this.forceUpdate();
    // this.onChangeNewIngredient();
  }
  removeDirection(index) {
    console.log(index);
    this.setState(function (state) {
      state.directions.splice(index, 1);
    });
    this.forceUpdate();
  }

  render() {
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
                    value={this.state.title}
                    onChange={this.onChangeTitle}
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
                    value={this.state.serves}
                    onChange={this.onChangeServes}
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
                    value={this.state.description}
                    onChange={this.onChangeDescription}
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
                      value={this.state.newIngredient.name}
                      onChange={this.onChangeNewIngredient}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary float-right mx-2"
                        onClick={this.onChangeIngredients}
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
              {this.state.ingredients.map(function (ingredient, index) {
                return (
                  <div className="col-5 mx-3" key={ingredient.id}>
                    <div className="row my-4 d-flex justify-content-center align-items-center">
                      <div className="col-8">
                        <li className="w-100">{ingredient.name}</li>
                      </div>
                      <div className="col-4 text-center">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => this.removeIngredient(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }, this)}
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
                  <h4>{this.state.directions.length + 1}.</h4>
                  <input
                    type="text"
                    name="direction"
                    className="form-control w-75 ml-2"
                    value={this.state.newDirection.name}
                    onChange={this.onChangeNewDirection}
                  />
                  <button
                    className="btn btn-dark float-right mx-2"
                    onClick={this.onChangeDirections}
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
              {this.state.directions.map(function (direction, index) {
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
                          onClick={() => this.removeDirection(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }, this)}
            </div>
          </div>
        </div>

        <div className="row text-center w-100 justify-content-end my-4 fixed-bottom">
          <button
            className="btn btn-success btn-lg text-center"
            onClick={this.onSubmit}
          >
            SAVE TO COOKBOOK
          </button>
        </div>
      </div>
    );
  }
}
