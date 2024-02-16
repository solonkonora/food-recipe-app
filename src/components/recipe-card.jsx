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
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// const RecipeCard = ({ recipe }) => {
//   const { strMeal, strMealThumb, idMeal, strCategory } = recipe;
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleDialogToggle = () => {
//     setDialogOpen(!dialogOpen);
//   };

//   return (
//     <div className="card">
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
//         <button
//           className="details-button"
//           onClick={handleDialogToggle}
//         >
//           Details
//         </button>
//       </div>

//       {dialogOpen && (
//         <div className="dialog">
//           <h4>Recipe Details</h4>
//           <p>Insert recipe details here...</p>
//           <button
//             className="close-dialog-button"
//             onClick={handleDialogToggle}
//           >
//             Close
//           </button>
//         </div>
//       )}
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
 import React, { useState } from "react";
 import PropTypes from "prop-types";
 
 const RecipeCard = ({ recipe }) => {
   // eslint-disable-next-line no-unused-vars
   const { strMeal, strMealThumb, idMeal, strCategory } = recipe;
   const [dialogOpen, setDialogOpen] = useState(false);
 
   const handleDialogToggle = () => {
     setDialogOpen(!dialogOpen);
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
             <strong>Instructions:</strong> {recipe.strInstructions}
           </p>
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
     strInstructions: PropTypes.string.isRequired,
   }).isRequired,
 };
 
 export default RecipeCard;