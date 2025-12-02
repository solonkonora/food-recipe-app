import { useEffect } from "react";
import { Coffee, Sandwich, UtensilsCrossed, Cookie, Popcorn } from "lucide-react";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppContext";
import "../assets/styles/catergories.css";

const Categories = ({ onCategoryClick }) => {
  const { categories, fetchCategories, recipes } = useAppContext();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Remove duplicate categories if any exist
  const uniqueCategories = categories.filter((cat, index, self) =>
    index === self.findIndex((c) => c.id === cat.id)
  );

  // Map icons to category names
  const iconMap = {
    "Breakfast": Coffee,
    "Lunch": Sandwich,
    "Dinner": UtensilsCrossed,
    "Dessert": Cookie,
    "Snacks": Popcorn,
  };

  // Count recipes per category
  const getCategoryCount = (categoryId) => {
    const count = recipes.filter(r => r.category_id === categoryId).length;
    return `${count} ${count === 1 ? 'recipe' : 'recipes'}`;
  };

  const handleCategoryClick = (categoryName) => {
    if (onCategoryClick) {
      onCategoryClick(categoryName);
    }
  };

  return (
    <section id="categories" className="categories-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Recipe Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of recipes organized by meal type.
          </p>
        </div>

        <div className="categories-grid">
          {categories.length === 0 ? (
            <p>Loading categories...</p>
          ) : recipes.length === 0 ? (
            <p>Loading recipes...</p>
          ) : (
            uniqueCategories
              .filter(category => {
                // Only show categories that have recipes
                const count = recipes.filter(r => r.category_id === category.id).length;
                return count > 0;
              })
              .map((category, index) => {
                const Icon = iconMap[category.name] || UtensilsCrossed;
                const recipeCount = getCategoryCount(category.id);
                
                return (
                  <div
                    key={category.id}
                    className="category-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="icon-wrapper">
                      <Icon className="category-icon" />
                    </div>
                    <h3 className="category-title">{category.name}</h3>
                    <p className="category-count">{recipeCount}</p>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </section>
  );
};

Categories.propTypes = {
  onCategoryClick: PropTypes.func,
};

export default Categories;
