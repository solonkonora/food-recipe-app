// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const RecipeCard = ({ recipe }) => {
   // eslint-disable-next-line react/prop-types, no-unused-vars
   const { idMeal, strMeal, strCategory, strMealThumb } = recipe;

    return (
        <div className="card">
            <img
            src="{strMealThumb}"
            alt={"strMeal"}
            className={"card-image"}
            />

<div className="card-body">
    <span className="category">{strCategory}</span>
    <h3>{strMeal}</h3>
<a href={"https://www.themealdb.com/meal/" + idMeal} target="_blank" rel="noreferrer">Ingredients</a>
</div>

        </div>
    )
    };
export default RecipeCard;