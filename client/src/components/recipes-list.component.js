import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    ReactTooltip.rebuild();
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [recipes]);

  const { user } = useAuth0();
  let sub;
  if (user) {
    sub = user.sub;
  }

  let recipeToFavorite;

  const removeFavoriteTooltip = () => {
    // ReactTooltip.show();
  };

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
    ReactTooltip.rebuild();
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
    ReactTooltip.rebuild();
  };

  return (
    <div className="container-fluid" style={{ minHeight: "50vh" }}>
      <div className="row w-100">
        <div className="col-12 col-lg-5 mx-auto text-center mb-3">
          <h3>Recipes</h3>
        </div>
      </div>
      <div className="row mb-5 d-flex justify-content-center">
        {recipes.map(function (recipe, index) {
          let removeIcon;
          let addIcon;
          if (recipe.hasOwnProperty("favoritedBy")) {
            if (recipe.favoritedBy.length > 0) {
              if (recipe.favoritedBy.includes(sub)) {
                removeIcon = (
                  <h1
                    className="float-right text-warning"
                    onClick={() => removeFavorite(recipe._id)}
                    style={{ cursor: "pointer" }}
                    data-tip
                    data-for="removeTip"
                    onMouseOver={removeFavoriteTooltip}
                  >
                    *
                  </h1>
                );
              } else {
                addIcon = (
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
              addIcon = (
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
            <div
              key={recipe._id}
              className="card shadow text-dark mb-5 col-10 mx-5 col-lg-3 col-md-6"
            >
              <div className="card-body text-center">
                {removeIcon}
                {addIcon}
                <ReactTooltip id="removeTip" place="top" effect="solid">
                  Remove From Favorites
                </ReactTooltip>
                <ReactTooltip id="addTip" place="top" effect="solid">
                  Add To Favorites
                </ReactTooltip>
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
