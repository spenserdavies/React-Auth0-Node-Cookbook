import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ViewRecipe(props) {
  const [activeRecipe, setActiveRecipe] = useState({});

  useEffect(() => {
    const { id } = props.match.params;
    console.log(id);
    getRecipe(id);
  }, [props.match.params]);

  const getRecipe = (id) => {
    axios
      .get("http://localhost:5000/recipes/" + id)
      .then((res) => {
        setActiveRecipe(res.data);
      })
      .catch((err) => console.error(err));
  };

  let recipe = activeRecipe;
  console.log(recipe);

  const deleteRecipe = () => {
    axios
      .delete("http://localhost:5000/recipes/" + props.match.params.id)
      .then(() => {
        window.location = "/";
      })
      .catch((err) => console.error(err));
  };

  const { user } = useAuth0();
  let deleteButton;

  if (user) {
    if (user.sub === recipe.userId) {
      deleteButton = (
        <button className="btn btn-sm btn-danger" onClick={deleteRecipe}>
          Delete Recipe
        </button>
      );
    }
  }

  const generatePdf = () => {
    const input = document.getElementById("document");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save(`${recipe.title}.pdf`);
    });
  };

  return (
    <div className="container border p-3" id="document">
      <button className="btn btn-dark " onClick={generatePdf}>
        Save PDF
      </button>
      <div className="row">
        <div className="col-12 mx-auto text-center">
          <h3>{recipe.title}</h3>
          <h4>{recipe.description}</h4>
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
                  <div className="col-6 my-2 text-left" key={ingredient.id}>
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
      <div className="row">
        <div className="col-12 text-right">{deleteButton}</div>
      </div>
    </div>
  );
}

export default ViewRecipe;
