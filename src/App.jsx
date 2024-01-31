import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/search-bar";
import RecipeCard from "./components/recipe-card";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  //fetching data
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

  // without the array object "[]" at the end, useEffect will be rendering and updating the entire dom each time the code is runned
  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <div className="container">
      <h2>Tasty Recipes</h2>

      <SearchBar
        handleSubmit={handleSubmit}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        isLoading={isLoading}
      />

      <div className="recipes">
        {recipes ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No Recipes!</p>
        )}
      </div>
    </div>
  );
}

export default App;
