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
