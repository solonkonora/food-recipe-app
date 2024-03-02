// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/styles/update-recipe.css";

const UpdateRecipe = ({ onUpdateRecipe, recipeToUpdate }) => {
  const [recipe, setRecipe] = useState({
    recipeId: recipeToUpdate.recipeId,
    recipeName: recipeToUpdate.recipeName,
    ingredients: recipeToUpdate.ingredients,
    instructions: recipeToUpdate.instructions,
    image: ""
  });

  useEffect(() => {
    const savedRecipe = localStorage.getItem("updatedRecipe");
    if (savedRecipe) {
      setRecipe(JSON.parse(savedRecipe));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: files[0]
      }));
    } else {
      // const savedRecipe = JSON.parse(localStorage.getItem(value));
      const savedRecipe = JSON.parse(localStorage.getItem(name));
      if (savedRecipe) {
        setRecipe(savedRecipe);
      } else {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          [name]: value
        }));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateRecipe(recipe);
    localStorage.setItem(recipe.recipeName, JSON.stringify(recipe));
    setRecipe({
      recipeId: "",
      recipeName: "",
      ingredients: "",
      instructions: "",
      image: ""
    });
  };

  useEffect(() => {
    localStorage.setItem("updatedRecipe", JSON.stringify(recipe));
  }, [recipe]);

  return (
    <div className="update-recipe-container">
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="recipeName"
            value={recipe.recipeName}
            onChange={handleChange}
            // disabled
           // required
          />
        </label>
        <br />
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            //required
          />
        </label>
        <br />
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            //required
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="image" onChange={handleChange} />
        </label>
        {recipe.image && (
          <img src={URL.createObjectURL(recipe.image)} alt="Selected" />
        )}
        <br />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

UpdateRecipe.propTypes = {
  // recipeToUpdate: PropTypes.shape({
  //   recipeId: PropTypes.string,
  //   recipeName: PropTypes.string,
  //   ingredients: PropTypes.string,
  //   instructions: PropTypes.string,
  //   image: PropTypes.string 
  // }),
  onUpdateRecipe: PropTypes.func,
  recipeToUpdate: PropTypes.string
};

export default UpdateRecipe;






// // eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from "react";
// // import PropTypes from "prop-types";
// import "../assets/styles/update-recipe.css";
// import { foodData, updateLocalStorage } from './new-recipies.jsx';

// // Function to update an existing recipe
// const updateRecipe = (recipeId, updatedRecipe) => {
//   // Find the index of the recipe to be updated in the array
//   const recipeIndex = foodData.findIndex((recipe) => recipe.id === recipeId);

//   // If the recipe exists, update it with the new data
//   if (recipeIndex !== -1) {
//     foodData[recipeIndex] = { ...foodData[recipeIndex], ...updatedRecipe };

//     // Update the foodData array in local storage
//     updateLocalStorage();
//   }
// };

// // Rest of the code...
// export default updateRecipe;