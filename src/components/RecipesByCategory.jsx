import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChefHat } from "lucide-react";
import RecipeCard from "./recipe-card";
import { useAppContext } from "../context/AppContext";
import "../assets/styles/recipes-by-category.css";

export default function RecipesByCategory({ publicView = false, selectedCategory = null, onLoginRequired }) {
  const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory || "all");
  const { recipes, isLoading, fetchRecipes } = useAppContext();

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
  }, [fetchRecipes]);

  useEffect(() => {
    // map category name to ID when in public view
    if (publicView && selectedCategory) {
      const category = categories.find(cat => 
        cat.label.toLowerCase() === selectedCategory.toLowerCase()
      );
      if (category) {
        setSelectedCategoryState(category.id);
      }
    }
  }, [selectedCategory, publicView]);

  const filteredRecipes = selectedCategoryState === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.category_id === parseInt(selectedCategoryState));

  const getCategoryLabel = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.label : "All Recipes";
  };

  const handleRecipeDeleted = () => {
    // refresh the recipes list after deletion
    fetchRecipes();
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
            value={selectedCategoryState}
            onChange={(e) => setSelectedCategoryState(e.target.value)}
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
        {!isLoading && (
          <p>
            Showing <strong>{filteredRecipes.length}</strong> {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
            {selectedCategoryState !== "all" && ` in ${getCategoryLabel(selectedCategoryState)}`}
          </p>
        )}
      </div>

      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading delicious recipes...</p>
        </div>
      )}

      {!isLoading && filteredRecipes.length === 0 && (
        <div className="empty-state">
          <ChefHat size={64} className="empty-icon" />
          <h3>No recipes found</h3>
          <p>
            {selectedCategoryState === "all"
              ? "No recipes available yet. Be the first to add one!"
              : `No recipes found in ${getCategoryLabel(selectedCategoryState)} category.`}
          </p>
        </div>
      )}

      {!isLoading && filteredRecipes.length > 0 && (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
              onRecipeDeleted={handleRecipeDeleted}
              publicView={publicView}
              onLoginRequired={onLoginRequired}
            />
          ))}
        </div>
      )}
    </div>
  );
}

RecipesByCategory.propTypes = {
  publicView: PropTypes.bool,
  selectedCategory: PropTypes.string,
  onLoginRequired: PropTypes.func,
};
