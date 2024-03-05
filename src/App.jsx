import React, { useEffect } from "react";
import "./App.css";
import SearchBar from "./components/search-bar";
import Home from "./components/home"
import RecipeCard from "./components/recipe-card";
import { useAppContext } from "./context/AppContext";

// import UpdateRecipe from "./components/update-recipe";
// import DeleteRecipe from "./components/delete-recipe";

function App() {
    const { recipes, setAddedRecipes } = useAppContext();

    //Retrieve added recipes from local storage
    useEffect(() => {
        const savedRecipes = localStorage.getItem("recipes");
        if (savedRecipes) {
            setAddedRecipes(JSON.parse(savedRecipes));
        }
    }, []);

    return (
        <>
            <Home />
            <div className="container">
                <h2>Tasty Recipes</h2>
                <SearchBar />

                <div className="recipes">
                    {recipes?.length > 0 && (
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
                </div>
{/* 
                <RecipeProvider>
                    <UpdateRecipe />
                    <DeleteRecipe />
                </RecipeProvider>, */}
            </div>
        </>
    );
}

export default App;