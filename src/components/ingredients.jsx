// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../api-calls"
import { useParams } from "react-router-dom";
import { getIngredientsById } from "../api-calls";

const Ingredients = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const fetchedIngredients = await getIngredientsById(id);
        setIngredients(fetchedIngredients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, [id]);

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.ingredient} - {ingredient.measure}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;