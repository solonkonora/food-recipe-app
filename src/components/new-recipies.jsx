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