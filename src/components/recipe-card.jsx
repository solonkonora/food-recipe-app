// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const RecipeCard = ({ recipe }) => {
  const { strMeal, strMealThumb, idMeal, strCategory } = recipe;

  return (
      <div className="card">
        <img src={strMealThumb} alt={"strMeal"} className={"card-image"} />

        <div className="card-body">
          <span className="category">{strCategory}</span>
          <h3>{strMeal}</h3>
          <a
            href={`https://www.themealdb.com/meal/${idMeal}`}
            target="_blank"
            rel="noreferrer"
            style={{color:"white"}}
          >
            Ingredients
          </a>
        </div>
      </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;




// eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const RecipeCard = ({ recipe }) => {
//   const [showIngredients, setShowIngredients] = useState(false);

//   const toggleIngredients = () => {
//     setShowIngredients((prevShowIngredients) => !prevShowIngredients);
//   };

//   const renderIngredients = () => {
//     if (recipe && showIngredients) {
//       const ingredients = [];
//       for (let i = 1; i <= 20; i++) {
//         const ingredientKey = `strIngredient${i}`;
//         const measureKey = `strMeasure${i}`;
//         if (recipe[ingredientKey]) {
//           ingredients.push(
//             <li key={i}>
//               {recipe[ingredientKey]} - {recipe[measureKey]}
//             </li>
//           );
//         }
//       }
//       return <ul>{ingredients}</ul>;
//     }
//     return null;
//   };

//   return (
//     <div className="recipe-card">
//       <h3>{recipe.strMeal}</h3>
//       <img src={recipe.strMealThumb} alt={recipe.strMeal} />
//       <button onClick={toggleIngredients}>
//         {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
//       </button>
//       {renderIngredients()}
//     </div>
//   );
// };

// RecipeCard.propTypes = {
//   recipe: PropTypes.shape({
//     strMeal: PropTypes.string.isRequired,
//     strMealThumb: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default RecipeCard;