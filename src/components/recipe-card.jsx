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
//     <>
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
//             <UpdateRecipe
//               onUpdateRecipe={handleUpdateRecipe}
//               recipeToUpdate={recipe}
//             />
//             <DeleteRecipe
//               recipeToDelete={recipe}
//               onDeleteRecipe={handleDeleteRecipe}
//             />
//           </div>
//           <button className="close-dialog-button" onClick={handleDialogToggle}>
//             Close
//           </button>
//         </div>
//       )}


//       {/* Display newly added recipes */}
//       {/* <div className="new-recipes">
//         <h4>Newly Added Recipes</h4> */}
//         {/* Iterate over the newly added recipes and display them */}
//         {/* {localStorage.getItem("recipes") && (
//           <ul>
//             {JSON.parse(localStorage.getItem("recipes")).map((recipe, name) => (
//               <li key={name}>{recipe.strMeal}</li>
//             ))}
//           </ul>
//         )}
//       </div> */}
//     </div>
// {/* <div>
// <AddRecipe/>
// </div> */}
// </>
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
//   recipeName: PropTypes.string.isRequired,
//   onUpdateRecipe: PropTypes.func.isRequired,
//   onDeleteRecipe: PropTypes.func.isRequired,
//   onAddRecipe: PropTypes.func.isRequired
// };

// export default RecipeCard;


import React, { useState } from "react";
import PropTypes from "prop-types";
import AddRecipe from "./add-recipe";
import UpdateRecipe from "./update-recipe";
import DeleteRecipe from "./delete-recipe";

const RecipeCard = ({
  recipe,
  recipeName,
  onUpdateRecipe,
  onDeleteRecipe,
  onAddRecipe
}) => {
  const { idMeal, strMeal, strMealThumb, strCategory, strInstructions } = recipe;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newlyAddedRecipes, setNewlyAddedRecipes] = useState([]);

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleAddRecipe = (newRecipe) => {
    onAddRecipe(newRecipe);

    // Retrieve existing recipes from local storage
    const existingRecipes = localStorage.getItem("recipes");
    let recipesArray = [];

    if (existingRecipes) {
      recipesArray = JSON.parse(existingRecipes);
    }

    // Add the new recipe to the recipes array
    recipesArray.push(newRecipe);

    // Save the updated recipes array back to local storage
    localStorage.setItem("recipes", JSON.stringify(recipesArray));

    // Update the state to display the newly added recipes
    setNewlyAddedRecipes(recipesArray);
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    onUpdateRecipe(updatedRecipe);
    setDialogOpen(false);
  };

  const handleDeleteRecipe = () => {
    onDeleteRecipe(idMeal);
  };

  return (
    <>
      <div className="card">
        <img src={strMealThumb} alt={strMeal} className="card-image" />
        <div className="card-body">
          <span className="category">{strCategory}</span>
          <h3>{recipeName}</h3>
          <button className="details-button" onClick={handleDialogToggle}>
            Details
          </button>
        </div>
        {dialogOpen && (
          <div className="dialog">
            <h4>Recipe Details</h4>
            <p>
              <strong>Name:</strong> {strMeal}
            </p>
            <p>
              <strong>Instructions:</strong> {strInstructions}
            </p>
            <div className="dialog-buttons">
              <AddRecipe onAddRecipe={handleAddRecipe} />
              <UpdateRecipe
                onUpdateRecipe={handleUpdateRecipe}
                recipeToUpdate={recipe}
              />
              <DeleteRecipe
                recipeToDelete={recipe}
                onDeleteRecipe={handleDeleteRecipe}
              />
            </div>
            <button className="close-dialog-button" onClick={handleDialogToggle}>
              Close
            </button>
          </div>
        )}
      </div>

      {/* Display newly added recipes */}
      {newlyAddedRecipes.length > 0 && (
        <div className="new-recipes">
          <h4>Newly Added Recipes</h4>
          <ul>
            {newlyAddedRecipes.map((recipe, index) => (
              <li key={index}>{recipe.strMeal}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string
  }),
  recipeName: PropTypes.string.isRequired,
  onUpdateRecipe: PropTypes.func.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
  onAddRecipe: PropTypes.func.isRequired,
};

export default RecipeCard;