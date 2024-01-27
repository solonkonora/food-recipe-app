import { useState } from "react";
import "./App.css";
// import SearchBar from "./components/SearchBar";
// import RecipeCard from "./components/RecipeCard";

const apiUrl = "www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
const [isLoading, setIsLoading] = useState(false);
const [query,  setQuery] = useState("");
const [recipes, setRecipes] = useState([]);

// fetching data
const seachRecipes = async () => {
  setIsLoading(true)
  const url = apiUrl + query;
  const res = await fetch(url)
  const data = await res.json()

// console.log(data)

  setQuery(data.meals)
  setIsLoading(false)
};

useEffect(() => {
  seachRecipes()
}, []);

  return (
      <div className="container">
        <h2>Le Recipees </h2>
        <div className="recipes">
        (recipes ? recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))
        : "No Recipes!")

        </div>
     
      </div>
  );
}

export default App
