// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import PropTypes from "prop-types";

// const RecipeCard = ({ recipe }) => {
//   const { strMeal, strMealThumb, idMeal, strCategory } = recipe;

//   return (
//     <div className="card">
//       <img src={strMealThumb} alt={"strMeal"} className={"card-image"} />

//       <div className="card-body">
//         <span className="category">{strCategory}</span>
//         <h3>{strMeal}</h3>
//         <a
//           href={`https://www.themealdb.com/meal/${idMeal}`}
//           target="_blank"
//           rel="noreferrer"
//           style={{ color: "white" }}
//         >
//           ingredients
//         </a>
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
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { strMeal, strMealThumb, idMeal, strCategory } = recipe;

  return (
    <div className="card">
      <img src={strMealThumb} alt={strMeal} className="card-image" />

      <div className="card-body">
        <span className="category">{strCategory}</span>
        <h3>{strMeal}</h3>
        <Link
          to={`/ingredients/${idMeal}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          ingredients
        </Link>
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


















// IMPLEMENTING THE USENAVIGATION
// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import PropTypes from "prop-types";
// import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

// const RecipeCard = ({ recipe }) => {
//   const navigate = useNavigate();
//   const { strMeal, strMealThumb, idMeal, strCategory } = recipe;

//   const handleClick = () => {
//     navigate(`/ingredients/${idMeal}`);
//   };

//   return (
//     <Router>
//       <div className="card">
//         <img src={strMealThumb} alt={strMeal} className="card-image" />

//         <div className="card-body">
//           <span className="category">{strCategory}</span>
//           <h3>{strMeal}</h3>
//           <button onClick={handleClick} style={{ color: "white", background: "none", border: "none" }}>
//             Ingredients
//           </button>
//         </div>
//       </div>
//     </Router>
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