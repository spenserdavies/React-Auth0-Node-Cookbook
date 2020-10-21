import React, { Component } from "react";
import axios from "axios";

export default class ViewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = { activeRecipe: {} };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);

    axios
      .get("http://localhost:5000/recipes/" + id)
      .then((res) => {
        this.setState({
          activeRecipe: res.data,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    let recipe = this.state.activeRecipe;
    console.log(recipe);

    return (
      <div className="container border p-3">
        <div className="row">
          <div className="col-6 mx-auto text-center">
            <h3>{recipe.title}</h3>
            <p>Servings: {recipe.serves}</p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="row text-center">
              <div className="col-12 text-center">You Will Need:</div>
              {recipe.ingredients ? (
                recipe.ingredients.map(function (ingredient, index) {
                  return (
                    <div className="col-5 m-2 text-left" key={ingredient.id}>
                      <li key={ingredient.id}>{ingredient.name}</li>
                    </div>
                  );
                })
              ) : (
                <h1>There are no ingredients listed for this recipe :o</h1>
              )}
            </div>
            <hr />
            <div className="row">
              <div className="col-12">Directions:</div>
              {recipe.directions ? (
                recipe.directions.map(function (direction, index) {
                  return (
                    <div className="col-12 m-2" key={direction.id}>
                      {index + 1}. {direction.name}
                    </div>
                  );
                })
              ) : (
                <h1>There are no instructions for this recipe :o</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
