// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../assets/styles/update-recipe.css'


const UpdateRecipe = ({ recipeToUpdate, onUpdateRecipe }) => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: ""
  });

  useEffect(() => {
    setRecipe(recipeToUpdate);
  }, [recipeToUpdate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateRecipe(recipe);
  };

  return (
    <div className="update-recipe-container">
      <h2>Update Recipe</h2>
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
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

UpdateRecipe.propTypes = {
  recipeToUpdate: PropTypes.shape({
    recipeName: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired
  }).isRequired,
  onUpdateRecipe: PropTypes.func.isRequired
};

export default UpdateRecipe;