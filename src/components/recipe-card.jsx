// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import 'font-awesome/css/font-awesome.min.css';
// import "../assets/styles/recipe-card.css";

// const RecipeCard = ({ recipe, recipeName }) => {
//   const { idMeal, strMeal, strMealThumb, strCategory, strInstructions } = recipe;
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleDialogToggle = () => {
//     setDialogOpen(!dialogOpen);
//   };

//   const handleToggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <>
//       <div className="card">
//         <div
//           className={`favorite-icon ${isFavorite ? 'favorite' : ''}`}
//           onClick={handleToggleFavorite}
//         >
//           <FontAwesomeIcon icon={faHeart} />
//         </div>
//         <img src={strMealThumb} alt={strMeal} className="card-image" />
//         <div className="card-body">
//           <span className="category">{strCategory}</span>
//           <h3>{recipeName}</h3>
//           <button className="details-button" onClick={handleDialogToggle}>
//             Details
//           </button>
//         </div>
//         {dialogOpen && (
//           <div className="dialog">
//             <h4>Recipe Details</h4>
//             <p>
//               <strong>Name:</strong> {strMeal}
//             </p>
//             <p>
//               <strong>Instructions:</strong> {strInstructions}
//             </p>
//             <button className="close-dialog-button" onClick={handleDialogToggle}>
//               Close
//             </button>
//           </div>
//         )}
//       </div>
//     </>
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
// };

// export default RecipeCard;





import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import "../assets/styles/recipe-card.css";

const RecipeCard = ({ recipe, recipeName }) => {
  const { idMeal, strMeal, strMealThumb, strCategory, strInstructions } = recipe;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the recipe is marked as a favorite in localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(idMeal));
  }, [idMeal]);

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...favorites];

    if (isFavorite) {
      // Remove the recipe from favorites
      const index = updatedFavorites.indexOf(idMeal);
      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      }
    } else {
      // Add the recipe to favorites
      updatedFavorites.push(idMeal);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className="card">
        <div
          className={`favorite-icon ${isFavorite ? 'favorite' : ''}`}
          onClick={handleToggleFavorite}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartRegular} />
        </div>
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
            <button className="close-dialog-button" onClick={handleDialogToggle}>
              Close
            </button>
          </div>
        )}
      </div>
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
};

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteRecipes(favorites);
  }, []);

  return (
    <div>
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <div className="favorite-recipes">
          {favoriteRecipes.map(recipeId => (
            <div key={recipeId}>
              {/* Fetch the recipe details based on recipeId */}
              {/* Provide the recipe name */}
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite recipes found.</p>
      )}
    </div>
  );
};

export default RecipeCard;
