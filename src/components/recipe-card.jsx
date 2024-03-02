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







 // eslint-disable-next-line no-unused-vars
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



// const handleUpdateRecipe = (updatedRecipe) => {
//   // Find the recipe to update in localStorage using the recipeId
//   const storedRecipes = JSON.parse(localStorage.getItem("recipes"));
//   const updatedRecipes = storedRecipes.map((storedRecipe) => {
//     if (storedRecipe.recipeId === updatedRecipe.recipeId) {
//       return updatedRecipe;
//     }
//     return storedRecipe;
//   });
  
//   // Update the recipe in localStorage
//   localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
//   alert("Recipe updated successfully!");
// };






// eslint-disable-next-line no-unused-vars
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
//         <h3>{recipeName}</h3> {/* Use the recipeName prop here */}
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

//             <UpdateRecipe onUpdateRecipe={handleUpdateRecipe} 
//             recipeToUpdate={recipe} />

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
//   recipeName: PropTypes.string, // Add the recipeName prop type
//   onUpdateRecipe: PropTypes.func,
//   onDeleteRecipe: PropTypes.func,
//   onAddRecipe: PropTypes.func
// };

// export default RecipeCard;






// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
// import AddRecipe from "./add-recipe";
// import UpdateRecipe from "./update-recipe";
// import DeleteRecipe from "./delete-recipe";

const RecipeCard = ({
  recipe,
  recipeName, 
  // onUpdateRecipe,
  // onDeleteRecipe,
  // onAddRecipe
}) => {
  const { idMeal, strMeal, strMealThumb, strCategory, strInstructions } = recipe;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  // const handleAddRecipe = (newRecipe) => {
  //   onAddRecipe(newRecipe);
  // };

  // const handleUpdateRecipe = (updatedRecipe) => {
  //   onUpdateRecipe(updatedRecipe);
  //   setDialogOpen(false);
  // };

  // const handleDeleteRecipe = () => {
  //   onDeleteRecipe(idMeal);
  // };

  return (
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
          {/* <div className="dialog-buttons">
            <AddRecipe onAddRecipe={handleAddRecipe} />
            <UpdateRecipe onUpdateRecipe={handleUpdateRecipe} recipeToUpdate={recipe} />
            <DeleteRecipe recipeToDelete={recipe} onDeleteRecipe={handleDeleteRecipe} />
          </div> */}
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
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string
  }),
  recipeName: PropTypes.string, // Updated the recipeName prop type to be required
  // onUpdateRecipe: PropTypes.func,
  // onDeleteRecipe: PropTypes.func,
  // onAddRecipe: PropTypes.func
};

export default RecipeCard;