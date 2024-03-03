import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/styles/update-recipe.css";

const UpdateRecipe = ({ onUpdateRecipe, recipeToUpdate }) => {
  const [recipe, setRecipe] = useState({
    recipeId: recipeToUpdate.recipeId,
    recipeName: recipeToUpdate.recipeName,
    ingredients: recipeToUpdate.ingredients,
    instructions: recipeToUpdate.instructions,
    isImage: recipeToUpdate.isImage,
    imageUrl: recipeToUpdate.imageUrl,
    image: null
  });

  useEffect(() => {
    const savedRecipe = localStorage.getItem("updatedRecipe");
    if (savedRecipe) {
      setRecipe(JSON.parse(savedRecipe));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        image: files[0],
        isImage: true,
        imageUrl: URL.createObjectURL(files[0])
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
    onUpdateRecipe(recipe);
    localStorage.setItem(recipe.recipeId, JSON.stringify(recipe));
    setRecipe({
      recipeId: "",
      recipeName: "",
      ingredients: "",
      instructions: "",
      isImage: false,
      imageUrl: "",
      image: null
    });
  };

  useEffect(() => {
    localStorage.setItem("updatedRecipe", JSON.stringify(recipe));
  }, [recipe]);

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
        <label>
          Image:
          <input type="file" name="image" onChange={handleChange} />
        </label>
        {recipe.imageUrl && (
          <img src={recipe.imageUrl} alt="Selected" />
        )}
        <br />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

UpdateRecipe.propTypes = {
  onUpdateRecipe: PropTypes.func,
  recipeToUpdate: PropTypes.shape({
    recipeId: PropTypes.string,
    recipeName: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    isImage: PropTypes.bool,
    imageUrl: PropTypes.string
  })
};

export default UpdateRecipe;