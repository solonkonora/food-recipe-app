// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/delete-recipe.css";

const DeleteRecipe = ({ recipeToDelete, onDeleteRecipe }) => {
  const handleDelete = () => {
    onDeleteRecipe(recipeToDelete.id);
  };

  return (
    <div className="delete-recipe-container">
      <h2>Delete Recipe</h2>
      <p>Are you sure you want to delete the recipe: {recipeToDelete.recipeName}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

DeleteRecipe.propTypes = {
  recipeToDelete: PropTypes.shape({
    id: PropTypes.number.isRequired,
    recipeName: PropTypes.string.isRequired
  }).isRequired,
  onDeleteRecipe: PropTypes.func.isRequired
};

export default DeleteRecipe;