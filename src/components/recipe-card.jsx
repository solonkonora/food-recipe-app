// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// const RecipeCard = ({ recipe }) => {
//   const { strMeal, strMealThumb, idMeal, strCategory } = recipe;

//   return (
//     <div className="card"
//     // style={{ height: "500px", width: "500px" }}
//     >
//       <img src={strMealThumb} alt={strMeal} className="card-image" />

//       <div className="card-body">
//         <span className="category">{strCategory}</span>
//         <h3>{strMeal}</h3>
//         <Link
//           to={`/ingredients/${idMeal}`}
//           style={{ color: "white", textDecoration: "none" }}
//         >
//           ingredients
//         </Link>
//       </div>
//     </div>
//   );
// };

// RecipeCard.propTypes = {
//   recipe: PropTypes.shape({
//     idMeal: PropTypes.string.isRequired,
//     strMeal: PropTypes.string.isRequired,
//     strMealThumb: PropTypes.string.isRequired,
//     strCategory: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default RecipeCard;







//  // eslint-disable-next-line no-unused-vars
//  import React, { useState } from "react";
//  import PropTypes from "prop-types";
 
//  // the RecipeCard component does not directly fetch the details it displays in the dialog box. Instead, 
//  // it relies on the recipe prop that is passed to it from a parent component.the parent component in the component 
//  // tree is responsible for fetching the recipe details and passing them down to the RecipeCard component as props. 
//  // The recipe prop contains the necessary data, such as strMeal, strMealThumb, idMeal, strCategory, and strInstructions, that are displayed in the RecipeCard component.
//  const RecipeCard = ({ recipe }) => {
//    const { strMeal, strMealThumb, strCategory } = recipe;
//    const [dialogOpen, setDialogOpen] = useState(false);
 
//    const handleDialogToggle = () => {
//      setDialogOpen(!dialogOpen);
//    };
 
//    return (
//      <div className="card">
//        <img src={strMealThumb} alt={strMeal} className="card-image" />
 
//        <div className="card-body">
//          <span className="category">{strCategory}</span>
//          <h3>{strMeal}</h3>
//          <button className="details-button" onClick={handleDialogToggle}>
//            Details
//          </button>
//        </div>
 
//        {dialogOpen && (
//          <div className="dialog">
//            <h4>Recipe Details</h4>
//            <p>
//              <strong>Name:</strong> {strMeal}
//            </p>
//            <p>
//              <strong>Instructions:</strong> {recipe.strInstructions}
//            </p>
//            <button className="close-dialog-button" onClick={handleDialogToggle}>
//              Close
//            </button>
//          </div>
//        )}
//      </div>
//    );
//  };
 
//  RecipeCard.propTypes = {
//    recipe: PropTypes.shape({
//      idMeal: PropTypes.string.isRequired,
//      strMeal: PropTypes.string.isRequired,
//      strMealThumb: PropTypes.string.isRequired,
//      strCategory: PropTypes.string.isRequired,
//      strInstructions: PropTypes.string.isRequired,
//    }).isRequired,
//  };
 
//  export default RecipeCard;








// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import AddRecipe from "./add-recipe";
import UpdateRecipe from "./update-recipe";
import DeleteRecipe from "./delete-recipe";

const RecipeCard = ({ recipe, onUpdateRecipe, onDeleteRecipe }) => {
  const { idMeal, strMeal, strMealThumb, strCategory, strInstructions } = recipe;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  // eslint-disable-next-line no-unused-vars
  const handleAddRecipe = (newRecipe) => {
    // Call a function to update the list of recipes with the new recipe
    // e.g., updateRecipes(newRecipe);
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    onUpdateRecipe(updatedRecipe);
    setDialogOpen(false);
  };

  const handleDeleteRecipe = () => {
    onDeleteRecipe(idMeal);
  };

  return (
    <div className="card">
      <img src={strMealThumb} alt={strMeal} className="card-image" />

      <div className="card-body">
        <span className="category">{strCategory}</span>
        <h3>{strMeal}</h3>
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
              recipeToUpdate={recipe}
              onUpdateRecipe={handleUpdateRecipe}
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
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired
  }).isRequired,
  onUpdateRecipe: PropTypes.func.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired
};

export default RecipeCard;
