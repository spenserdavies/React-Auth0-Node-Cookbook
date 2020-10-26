import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import RecipesList from "./components/recipes-list.component";
import EditRecipe from "./components/edit-recipe.component";
import CreateRecipe from "./components/create-recipe.component";
import ViewRecipe from "./components/view-recipe.component";
import ViewFavorites from "./components/view-favorites.component";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid">
        <br />
        <Route path="/" exact component={RecipesList} />
        <Route path="/edit/:id" component={EditRecipe} />
        <Route path="/create" component={CreateRecipe} />
        <Route path="/view/:id" component={ViewRecipe} />
        <Route path="/favorites/:userSub" component={ViewFavorites} />
      </div>
    </Router>
  );
}

export default App;
