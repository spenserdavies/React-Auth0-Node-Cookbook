const router = require("express").Router();
let Recipe = require("../models/recipe.model");

router.route("/").get((req, res) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  const serves = req.body.serves;
  const userId = req.body.userId;
  const favoritedBy = req.body.favoritedBy;

  const newRecipe = new Recipe({
    title,
    description,
    ingredients,
    directions,
    serves,
    userId,
    favoritedBy,
  });

  newRecipe
    .save()
    .then(() => res.json("Recipe Added"))
    .catch((err) => res.status(400).json("error :" + err));
});

router.route("/:id").get((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => res.json(recipe))
    .catch((err) => res.status(400).json("error :" + err));
});

router.route("/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("recipe deleted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/:id").put((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      // recipe.title = req.body.title;
      // recipe.description = req.body.description;
      // recipe.ingredients = req.body.ingredients;
      // recipe.directions = req.body.directions;
      // recipe.serves = req.body.serves;
      // recipe.userId = recipe.userId;
      recipe.favoritedBy = req.body.favoritedBy;
      recipe
        .save()
        .then(() => res.json("recipe updated"))
        .catch((err) => res.status(400).json("error: " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
