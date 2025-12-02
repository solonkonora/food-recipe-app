import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ChefHat, ArrowLeft } from "lucide-react";
import RecipeCard from "./recipe-card";
import { useAppContext } from "../context/AppContext";
import "../assets/styles/recipes-by-category.css";

export default function RecipesByCategory({ publicView = false, selectedCategory = null, onLoginRequired }) {
  const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory || "all");
  const { recipes, categories, isLoading, fetchRecipes, fetchCategories } = useAppContext();
  const navigate = useNavigate();

  // Build categories list with "All Recipes" option
  const categoryOptions = [
    { id: "all", name: "All Recipes" },
    ...categories
  ];

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, [fetchRecipes, fetchCategories]);

  useEffect(() => {
    // map category name to ID when in public view
    if (selectedCategory && categories.length > 0) {
      const category = categories.find(cat => 
        cat.name.toLowerCase() === selectedCategory.toLowerCase()
      );
      if (category) {
        setSelectedCategoryState(category.id.toString());
      }
    }
  }, [selectedCategory, categories]);

  const filteredRecipes = selectedCategoryState === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.category_id === parseInt(selectedCategoryState));

  const getCategoryLabel = (categoryId) => {
    if (categoryId === "all") return "All Recipes";
    const category = categories.find(cat => cat.id.toString() === categoryId.toString());
    return category ? category.name : "All Recipes";
  };

  const handleRecipeDeleted = () => {
    // refresh the recipes list after deletion
    fetchRecipes();
  };

  return (
    <div className="recipes-by-category">
      {publicView && (
        <button 
          onClick={() => navigate('/')} 
          className="back-button"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      )}
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
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
