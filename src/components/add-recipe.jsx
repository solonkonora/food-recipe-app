// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/add-recipe.css";

const AddRecipe = ({ onAddRecipe }) => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddRecipe(recipe);
    setRecipe({
      recipeName: "",
      ingredients: "",
      instructions: ""
    });
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="recipeName"
            value={recipe.recipeName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

AddRecipe.propTypes = {
  onAddRecipe: PropTypes.func.isRequired
};

export default AddRecipe;