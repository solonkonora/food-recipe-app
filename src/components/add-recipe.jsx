// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/add-recipe.css";

const AddRecipe = ({ onAddRecipe }) => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    image: ""
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: files[0]
      }));
    } else {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddRecipe(recipe);
    setRecipe({
      recipeName: "",
      ingredients: "",
      instructions: "",
      image: ""
    });
  };

  return (
    <div className="add-recipe-container">
      <h2 className="add-recipe-title">Add Recipe</h2>
      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <label className="add-recipe-label">
          Recipe Name:
          <input
            type="text"
            name="recipeName"
            value={recipe.recipeName}
            onChange={handleChange}
            required
            className="add-recipe-input"
          />
        </label>
        <br />
        <label className="add-recipe-label">
          Ingredients:
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
            className="add-recipe-textarea"
          />
        </label>
        <br />
        <label className="add-recipe-label">
          Instructions:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
            className="add-recipe-textarea"
          />
        </label>
        <br />
        <label className="add-recipe-label">
          Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="add-recipe-input"
          />
        </label>
        {recipe.image && (
          <img src={URL.createObjectURL(recipe.image)} alt="Selected" />
        )}
        <br />
        <button type="submit" className="add-recipe-button">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

AddRecipe.propTypes = {
  onAddRecipe: PropTypes.func.isRequired
};

export default AddRecipe;