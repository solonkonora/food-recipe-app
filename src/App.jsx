// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/search-bar";
import Home from "./components/home"
import RecipeCard from "./components/recipe-card";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [addedRecipes, setAddedRecipes] = useState([]);

  // Fetching data
  const searchRecipes = async () => {
    setIsLoading(true);
    const url = apiUrl + query;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setRecipes(data.meals);
    } catch (error) {
      console.error(error);
      // Handle the error state or display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Retrieve added recipes from local storage
  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    if (savedRecipes) {
      setAddedRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <>
    <Home />
      <div className="container">
        <h2>Tasty Recipes</h2>
        <SearchBar
          handleSubmit={handleSubmit}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          isLoading={isLoading}
        />

        <div className="recipes">
          {recipes.length > 0 && (
            <>
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal} // Use a unique identifier as the key prop
                  recipe={recipe}
                  recipeName={recipe.strMeal} // Pass the recipe name as the recipeName prop
                />
              ))}
            </>
          )}

          {addedRecipes.length > 0 && (
            <>
              {addedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal} // Use a unique identifier as the key prop
                  recipe={recipe}
                  recipeName={recipe.nameMeal} // Pass the recipe name as the recipeName prop
                />
              ))}
            </>
          )}
          {/* 
          {recipes.length === 0 && addedRecipes.length === 0 && (
            <p>No Recipes!</p>
          )} */}
        </div>

       
      </div>
    </>
  );
}

export default App;