// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../api-calls";
import { useParams } from "react-router-dom";
import { getIngredientsById } from "../api-calls";
import { Link } from "react-router-dom";

const Ingredients = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { ingredients, instructions } = await getIngredientsById(id);
        setIngredients(ingredients);
        setInstructions(instructions);
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
            <img src={ingredient.image} alt={ingredient.ingredient} />
            {ingredient.ingredient} - {ingredient.measure}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{instructions}</p>

      <Link
        to="/"
        style={{
          margin: "10px auto",
          width: "20%",
          color: "white",
          background: "teal",
          padding: "10px 20px",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Back
      </Link>
    </div>
  );
};

export default Ingredients;
