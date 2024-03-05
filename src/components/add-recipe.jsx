import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/add-recipe.css";

const AddRecipe = ({ onAddRecipe }) => {
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    image: null
  });

  // const handleChange = (event) => {
  //   const { name, value, files } = event.target;
  //   if (name === "image") {
  //     const imageUrl = URL.createObjectURL(files[0]); // Create a URL for the selected image
  //     setRecipe((prevRecipe) => ({
  //       ...prevRecipe,
  //       [name]: imageUrl // Store the image URL in the recipe state
  //     }));
  //   } else {
  //     setRecipe((prevRecipe) => ({
  //       ...prevRecipe,
  //       [name]: value
  //     }));
  //   }
  // };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          [name]: base64Image // Store the base64 image in the recipe state
        }));
      };
      reader.readAsDataURL(files[0]); // Read the image file as data URL
    } else {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveRecipeToLocalStorage(recipe);
    onAddRecipe(recipe);
    setRecipe({
      recipeName: "",
      ingredients: "",
      instructions: "",
      image: null
    });
  };

  const saveRecipeToLocalStorage = (recipe) => {
    const existingRecipes = localStorage.getItem("recipes");
    const updatedRecipes = existingRecipes
      ? JSON.parse(existingRecipes).concat(recipe)
      : [recipe];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className="add-recipe-container">
      <h2 className="add-recipe-title">Added Recipe</h2>
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
          <img src={recipe.image} alt="Selected" /> // Use the stored image URL from the recipe state
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
  onAddRecipe: PropTypes.func
};

export default AddRecipe;

