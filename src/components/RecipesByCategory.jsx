import { useState, useEffect } from "react";
import { ChefHat } from "lucide-react";
import RecipeCard from "./recipe-card";
import { getRecipes } from "../api/apiClient";
import "../assets/styles/recipes-by-category.css";

export default function RecipesByCategory() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: "all", label: "All Recipes" },
    { id: "1", label: "Breakfast" },
    { id: "2", label: "Lunch" },
    { id: "3", label: "Dinner" },
    { id: "4", label: "Dessert" },
    { id: "5", label: "Snacks" },
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRecipes();
      setRecipes(data || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = selectedCategory === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.category_id === parseInt(selectedCategory));

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.label : "All Recipes";
  };

  return (
    <div className="recipes-by-category">
      <div className="category-header">
        <div className="header-content">
          <ChefHat size={32} className="header-icon" />
          <h2>Browse Recipes by Category</h2>
        </div>
        
        <div className="category-dropdown-wrapper">
          <label htmlFor="category-select" className="dropdown-label">
            Category:
          </label>
          <select
            id="category-select"
            className="category-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="recipe-count">
        {!loading && (
          <p>
            Showing <strong>{filteredRecipes.length}</strong> {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
            {selectedCategory !== "all" && ` in ${getCategoryLabel(selectedCategory)}`}
          </p>
        )}
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading delicious recipes...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchRecipes} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredRecipes.length === 0 && (
        <div className="empty-state">
          <ChefHat size={64} className="empty-icon" />
          <h3>No recipes found</h3>
          <p>
            {selectedCategory === "all"
              ? "No recipes available yet. Be the first to add one!"
              : `No recipes found in ${getCategoryLabel(selectedCategory)} category.`}
          </p>
        </div>
      )}

      {!loading && !error && filteredRecipes.length > 0 && (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
