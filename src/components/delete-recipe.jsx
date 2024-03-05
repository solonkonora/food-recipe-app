// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/delete-recipe.css";

const DeleteRecipe = ({ recipeToDelete, onDeleteRecipe }) => {
  const handleDelete = () => {
    // Delete the recipe from local storage
    localStorage.removeItem(recipeToDelete.id);
    // Call the onDeleteRecipe function
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
    id: PropTypes.number,
    recipeName: PropTypes.string
  }),
  onDeleteRecipe: PropTypes.function
};

export default DeleteRecipe;






// // eslint-disable-next-line no-unused-vars
// import React from "react";
// // import PropTypes from "prop-types";
// import "../assets/styles/delete-recipe.css";
// import { foodData, updateLocalStorage } from './new-recipies';

// // Function to delete a recipe
// const deleteRecipe = (recipeId) => {
//   // Filter out the recipe with the specified ID from the array
//   foodData = foodData.filter((recipe) => recipe.id !== recipeId);

//   // Update the foodData array in local storage
//   updateLocalStorage();
// };

// export default deleteRecipe;


// import React, { useContext } from "react";
// import { RecipeContext } from "../context/RecipeContext";
// import "../assets/styles/delete-recipe.css";

// const DeleteRecipe = () => {
//   const { recipes, deleteRecipe } = useContext(RecipeContext);

//   const handleDeleteRecipe = (recipeId) => {
//     deleteRecipe(recipeId);
//   };

//   return (
//     <div className="delete-recipe-container">
//       <h2 className="delete-recipe-title">Delete Recipe</h2>
//       {recipes.map((recipe) => (
//         <div key={recipe.id} className="recipe-item">
//           <span>{recipe.recipeName}</span>
//           <button
//             className="delete-recipe-button"
//             onClick={() => handleDeleteRecipe(recipe.id)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DeleteRecipe;