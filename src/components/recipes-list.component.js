import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);
  const [recipeToFav, setRecipeToFav] = useState({
    title: "",
    description: "",
    ingredients: [],
    directions: [],
    serves: 0,
    userId: "",
    favoritedBy: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const { user } = useAuth0();
  let sub;
  if (user) {
    sub = user.sub;
  }

  let recipeToFavorite;

  let subString = null;
  if (user) {
    subString = <p>{user.sub}</p>;
  }

  const addFavorite = (id) => {
    console.log(id);
    if (user) {
      if (user.sub.length > 0) {
        axios
          .get("http://localhost:5000/recipes/" + id)
          .then((res) => {
            recipeToFavorite = res.data;
            console.log("res.data: ");
            console.log(res.data);
            console.log("recipeToFavorite:");
            console.log(recipeToFavorite);
            recipeToFavorite.favoritedBy.push(user.sub);
            console.log(recipeToFavorite);
          })
          .then(() => {
            axios
              .put("http://localhost:5000/recipes/" + id, recipeToFavorite)
              .then(() => {
                axios
                  .get("http://localhost:5000/recipes")
                  .then((res) => {
                    setRecipes(res.data);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              });
          });
      }
    }
  };

  const removeFavorite = (id) => {
    console.log(id);
    if (user) {
      if (user.sub.length > 0) {
        axios
          .get("http://localhost:5000/recipes/" + id)
          .then((res) => {
            recipeToFavorite = res.data;
            console.log("res.data: ");
            console.log(res.data);
            console.log("recipeToFavorite:");
            console.log(recipeToFavorite);
            let removalIndex = recipeToFavorite.favoritedBy.indexOf(user.sub);
            console.log(removalIndex);
            recipeToFavorite.favoritedBy.splice(removalIndex, 1);
            console.log(recipeToFavorite);
          })
          .then(() => {
            axios
              .put("http://localhost:5000/recipes/" + id, recipeToFavorite)
              .then(() => {
                axios
                  .get("http://localhost:5000/recipes")
                  .then((res) => {
                    setRecipes(res.data);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              });
          });
      }
    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: "50vh" }}>
      {/* {subString} */}
      <div className="row w-100">
        <div className="col-12 col-lg-5 mx-auto text-center mb-3">
          <h3>Recipes</h3>
        </div>
      </div>
      <div className="row mb-5">
        {recipes.map(function (recipe, index) {
          let favIcon;
          if (recipe.hasOwnProperty("favoritedBy")) {
            if (recipe.favoritedBy.length > 0) {
              if (recipe.favoritedBy.includes(sub)) {
                favIcon = (
                  <h1
                    className="float-right text-warning"
                    onClick={() => removeFavorite(recipe._id)}
                    style={{ cursor: "pointer" }}
                    data-tip
                  >
                    *
                  </h1>
                );
              } else {
                favIcon = (
                  <h1
                    className="float-right"
                    onClick={() => addFavorite(recipe._id)}
                    style={{ cursor: "pointer" }}
                    data-tip
                    data-for="addTip"
                  >
                    *
                  </h1>
                );
              }
            } else {
              favIcon = (
                <h1
                  className="float-right"
                  onClick={() => addFavorite(recipe._id)}
                  style={{ cursor: "pointer" }}
                  data-tip
                  data-for="addTip"
                >
                  *
                </h1>
              );
            }
          }

          let url = `/view/${recipe._id}`;
          return (
            <div className="card shadow text-dark mb-5 col-10 mx-auto col-lg-4 col-md-6">
              <div className="card-body text-center">
                <ReactTooltip id="removeFavoriteTip" place="top" effect="solid">
                  Remove From Favorites
                </ReactTooltip>
                <ReactTooltip id="addTip" place="top" effect="solid">
                  Add To Favorites
                </ReactTooltip>

                {favIcon}
                <Link to={url} className="text-dark">
                  <h4 className="card-title">{recipe.title}</h4>
                  <p>
                    <i>{recipe.description}</i>
                  </p>

                  <small>{recipe.serves} serving(s)</small>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecipeList;
