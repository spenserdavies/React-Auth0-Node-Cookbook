import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default class RecipesList extends Component {
  constructor(props) {
    super(props);

    this.deleteRecipe = this.deleteRecipe.bind(this);

    this.state = { recipes: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => {
        this.setState({
          recipes: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteRecipe(id) {
    axios
      .delete("http://localhost:5000/recipes/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      recipes: this.state.recipes.filter((r) => r._id !== id),
    });
  }
  render() {
    return (
      <div className="container-fluid" style={{ minHeight: "50vh" }}>
        <div className="row w-100">
          <div className="col-12 col-lg-5 mx-auto text-center">
            <h3>Recipes</h3>
          </div>
        </div>
        <div className="row w-100 mb-5">
          <div
            className="card-columns w-100 mb-5"
            style={{ minHeight: "30vh", columnCount: 3 }}
          >
            {this.state.recipes.map(function (recipe, index) {
              let url = `/view/${recipe._id}`;
              return (
                <Link to={url}>
                  <div className="card shadow w-100 mx-0 text-dark mb-5">
                    <div className="card-body text-center">
                      <h4 className="card-title">{recipe.title}</h4>
                      <p>{recipe.description}</p>

                      <small>{recipe.serves} serving(s)</small>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
