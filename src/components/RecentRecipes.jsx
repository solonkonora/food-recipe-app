import { useAppContext } from "../context/AppContext";
import RecipeCard from "./recipe-card";
import "../assets/styles/recent-recipes.css"

export default function RecentRecipes() {
  const { recipes, isLoading, fetchRecipes } = useAppContext();

  // get the most recent 12 recipes (or all if less than 12)
  const recentRecipes = recipes.slice(0, 12);

  const handleRecipeDeleted = () => {
    // refresh the recipes list after deletion
    fetchRecipes();
  };

  return (
    <div className="recent-recipes-container">
      <div className="recent-recipes-header">
        <h2>Recent Recipes</h2>
        <p className="recipes-count">
          {recentRecipes.length} {recentRecipes.length === 1 ? "recipe" : "recipes"}
        </p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading recipes...</p>
        </div>
      ) : recentRecipes.length > 0 ? (
        <div className="recent-recipes-grid">
          {recentRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              recipeName={recipe.title}
              onRecipeDeleted={handleRecipeDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No recipes found. Add your first recipe!</p>
        </div>
      )}
    </div>
  );
}
