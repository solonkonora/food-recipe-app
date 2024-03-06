import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../assets/styles/update-recipe.css";

const UpdateRecipe = ({ onUpdateRecipe, recipeToUpdate }) => {
  const [recipe, setRecipe] = useState({
    recipeId: recipeToUpdate.recipeId,
    recipeName: recipeToUpdate.recipeName,
    ingredients: recipeToUpdate.ingredients,
    instructions: recipeToUpdate.instructions,
    isImage: recipeToUpdate.isImage,
    imageUrl: recipeToUpdate.imageUrl,
    image: null
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
        image: files[0],
        isImage: true,
        imageUrl: URL.createObjectURL(files[0])
      }));
    } else {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateRecipe(recipe);
    localStorage.setItem(recipe.recipeId, JSON.stringify(recipe));
    setRecipe({
      recipeId: "",
      recipeName: "",
      ingredients: "",
      instructions: "",
      isImage: false,
      imageUrl: "",
      image: null
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
            required
          />
        </label>
        <br />
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="image" onChange={handleChange} />
        </label>
        {recipe.imageUrl && (
          <img src={recipe.imageUrl} alt="Selected" />
        )}
        <br />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

UpdateRecipe.propTypes = {
  onUpdateRecipe: PropTypes.func,
  recipeToUpdate: PropTypes.shape({
    recipeId: PropTypes.string,
    recipeName: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    isImage: PropTypes.bool,
    imageUrl: PropTypes.string
  })
};

export default UpdateRecipe;





// import React, { useState, useContext } from "react";
// import { RecipeContext } from "../context/RecipeContext";
// import "../assets/styles/update-recipe.css";

// const UpdateRecipe = () => {
//   const { recipes, updateRecipe } = useContext(RecipeContext);
//   const [recipeId, setRecipeId] = useState("");
//   const [updatedRecipeName, setUpdatedRecipeName] = useState("");
//   const [updatedRecipeIngredients, setUpdatedRecipeIngredients] = useState("");
//   const [updatedRecipeInstructions, setUpdatedRecipeInstructions] = useState("");
//   const [updatedRecipeImage, setUpdatedRecipeImage] = useState(null);

//   const handleRecipeIdChange = (event) => {
//     setRecipeId(event.target.value);
//   };

//   const handleUpdatedRecipeNameChange = (event) => {
//     setUpdatedRecipeName(event.target.value);
//   };

//   const handleUpdateRecipe = (event) => {
//     event.preventDefault();
//     const updatedRecipe = {
//       id: recipeId,
//       recipeName: updatedRecipeName,
//       // Add other updated fields here
//       ingredients: updatedRecipeIngredients,
//       instructions: updatedRecipeInstructions,
//       image: updatedRecipeImage
//     };
//     updateRecipe(updatedRecipe);
//     setRecipeId("");
//     setUpdatedRecipeName("");
//     setUpdatedRecipeIngredients("");
//     setUpdatedRecipeInstructions("");
//     setUpdatedRecipeImage(null);
//   };

//   const handleIngredientsChange = (event) => {
//     setUpdatedRecipeIngredients(event.target.value);
//   };

//   const handleInstructionsChange = (event) => {
//     setUpdatedRecipeInstructions(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setUpdatedRecipeImage(file);
//   };

//   return (
//     <div className="update-recipe-container">
//       <h2 className="update-recipe-title">Update Recipe</h2>
//       <form className="update-recipe-form" onSubmit={handleUpdateRecipe}>
//         <label className="update-recipe-label">
//           Recipe ID:
//           <input
//             type="text"
//             value={recipeId}
//             onChange={handleRecipeIdChange}
//             required
//             className="update-recipe-input"
//           />
//         </label>
//         <br />
//         <label className="update-recipe-label">
//           Updated Recipe Name:
//           <input
//             type="text"
//             value={updatedRecipeName}
//             onChange={handleUpdatedRecipeNameChange}
//             required
//             className="update-recipe-input"
//           />
//         </label>
//         <br />
//         <label>
//           Ingredients:
//           <textarea
//             name="ingredients"
//             value={updatedRecipeIngredients}
//             onChange={handleIngredientsChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Instructions:
//           <textarea
//             name="instructions"
//             value={updatedRecipeInstructions}
//             onChange={handleInstructionsChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Image:
//           <input type="file" name="image" onChange={handleImageChange} />
//         </label>
//         {updatedRecipeImage && (
//           <img src={URL.createObjectURL(updatedRecipeImage)} alt="Selected" />
//         )}
//         <br />
//         <button type="submit" className="update-recipe-button">
//           Update Recipe
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateRecipe;