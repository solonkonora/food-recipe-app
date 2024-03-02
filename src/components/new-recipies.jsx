// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import { updateLocalStorage } from "./add-recipe";
// import RecipeCard from "./recipe-card";

// // Retrieve the foodData array from local storage if it exists
// let foodData = [];
// const storedFoodDataString = localStorage.getItem("foodData");
// if (storedFoodDataString) {
//   foodData = JSON.parse(storedFoodDataString);
// }

// // Function to delete a recipe
// const deleteRecipe = (recipeId) => {
//   // Filter out the recipe with the specified ID from the array
//   foodData = foodData.filter((recipe) => recipe.id !== recipeId);

//   // Update the foodData array in local storage
//   updateLocalStorage();
// };

// // Render the NewRecipes component
// const NewRecipes = () => {
//   return (
//     <div>
//       {foodData.map((recipe) => (
//         <RecipeCard
//           key={recipe.id}
//           recipe={recipe}
//           onDeleteRecipe={deleteRecipe}
//         />
//       ))}
//     </div>
//   );
// };

// export default NewRecipes;







// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import AddRecipe from "./add-recipe";
// import UpdateRecipe from "./update-recipe";
// import DeleteRecipe from "./delete-recipe";

// const RecipeCard = ({
//   recipe,
//   recipeName, 
//   onUpdateRecipe,
//   onDeleteRecipe,
//   onAddRecipe
// }) => {
//   const { idMeal, strMeal, strMealThumb, strCategory, strInstructions } = recipe;
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleDialogToggle = () => {
//     setDialogOpen(!dialogOpen);
//   };

//   const handleAddRecipe = (newRecipe) => {
//     onAddRecipe(newRecipe);
  
//     // Retrieve existing recipes from local storage
//     const existingRecipes = localStorage.getItem("recipes");
//     let recipesArray = [];
  
//     if (existingRecipes) {
//       recipesArray = JSON.parse(existingRecipes);
//     }
  
//     // Add the new recipe to the recipes array
//     recipesArray.push(newRecipe);
  
//     // Save the updated recipes array back to local storage
//     localStorage.setItem("recipes", JSON.stringify(recipesArray));
//   };

//   const handleUpdateRecipe = (updatedRecipe) => {
//     onUpdateRecipe(updatedRecipe);
//     setDialogOpen(false);
//   };

//   const handleDeleteRecipe = () => {
//     onDeleteRecipe(idMeal);
//   };

//   return (
//     <div className="card">
//       <img src={strMealThumb} alt={strMeal} className="card-image" />
//       <div className="card-body">
//         <span className="category">{strCategory}</span>
//         <h3>{recipeName}</h3>
//         <button className="details-button" onClick={handleDialogToggle}>
//           Details
//         </button>
//       </div>
//       {dialogOpen && (
//         <div className="dialog">
//           <h4>Recipe Details</h4>
//           <p>
//             <strong>Name:</strong> {strMeal}
//           </p>
//           <p>
//             <strong>Instructions:</strong> {strInstructions}
//           </p>
//           <div className="dialog-buttons">
//             <AddRecipe onAddRecipe={handleAddRecipe} />
//             <UpdateRecipe onUpdateRecipe={handleUpdateRecipe} recipeToUpdate={recipe} />
//             <DeleteRecipe recipeToDelete={recipe} onDeleteRecipe={handleDeleteRecipe} />
//           </div>
//           <button className="close-dialog-button" onClick={handleDialogToggle}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>


//   );
// };

// RecipeCard.propTypes = {
//   recipe: PropTypes.shape({
//     idMeal: PropTypes.string,
//     strMeal: PropTypes.string,
//     strMealThumb: PropTypes.string,
//     strCategory: PropTypes.string,
//     strInstructions: PropTypes.string
//   }),
//   recipeName: PropTypes.string, // Updated the recipeName prop type to be required
//   onUpdateRecipe: PropTypes.func,
//   onDeleteRecipe: PropTypes.func,
//   onAddRecipe: PropTypes.func
// };

// export default RecipeCard;