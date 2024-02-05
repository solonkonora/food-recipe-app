const apiUrl = "https://www.themealdb.com/api/json/v1/1";

// export const searchRecipes = async (query) => {
//   const url = `${apiUrl}/search.php?s=${query}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();
//     return data.meals;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getRecipeById = async (id) => {
//   const url = `${apiUrl}/lookup.php?i=${id}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();
//     return data.meals[0];
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getIngredientsById = async (id) => {
  const url = `${apiUrl}/lookup.php?i=${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const meal = data.meals[0];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push({
          image: `https://www.themealdb.com/images/ingredients/${
            meal[`strIngredient${i}`]
          }-Small.png`,
          ingredient: meal[`strIngredient${i}`],
          measure: meal[`strMeasure${i}`],
        });
      }
    }
    const instructions = meal.strInstructions;
    return { ingredients, instructions };

  } catch (error) {
    console.error(error);
    throw error;
  }
};
