import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";

const apiUrl = "www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
const [isLoading, setIsLoading] = useState(false);
const [query,  setQuery] = useState("");
// eslint-disable-next-line no-unused-vars
const [recipes, setRecipes] = useState([]);

// fetching data
const searchRecipes = async () => {
  setIsLoading(true)
  const url = apiUrl + query;
  const res = await fetch(url)
  const data = await res.json()
  setQuery(data.meals)
  setIsLoading(false)
};

useEffect(() => {
  searchRecipes()
}, );

const handleSubmit = event => {
  event.preventDefault()
  searchRecipes()
};

  return (
      <div className="container">
        <h2>Le Recipees </h2>

        <SearchBar
            handleSubmit={handleSubmit}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            isLoading={isLoading}
        />

        <div className="recipes">
        { recipes ? recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))
        : "No Recipes!"}

        </div>
     
      </div>
  );
}

export default App
