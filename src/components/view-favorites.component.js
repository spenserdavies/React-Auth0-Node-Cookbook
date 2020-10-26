import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ViewFavorites(props) {
  const { user } = useAuth0();
  let userSub;
  if (user) {
    userSub = user.sub;
  }
  const [recipes, setRecipes] = useState([]);

  let recipeToFavorite;

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [recipes]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center mb-3">
          <h3>Favorite Recipes</h3>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        {recipes
          .filter((r) => r.favoritedBy.includes(userSub))
          .map(function (recipe, index) {
            let removeIcon;
            if (recipe.hasOwnProperty("favoritedBy")) {
              if (recipe.favoritedBy.length > 0) {
                if (recipe.favoritedBy.includes(userSub)) {
                  removeIcon = (
                    <h1
                      className="float-right text-warning"
                      onClick={() => removeFavorite(recipe._id)}
                      style={{ cursor: "pointer" }}
                    >
                      *
                    </h1>
                  );
                }
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

export default ViewFavorites;
