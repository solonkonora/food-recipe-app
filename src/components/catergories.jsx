import { Coffee, Sandwich, UtensilsCrossed, Cookie, Popcorn } from "lucide-react";
import PropTypes from "prop-types";
import "../assets/styles/catergories.css";

const Categories = ({ onCategoryClick }) => {
  const categories = [
    { icon: Coffee, name: "Breakfast", count: "20 recipes", id: "1" },
    { icon: Sandwich, name: "Lunch", count: "35 recipes", id: "2" },
    { icon: UtensilsCrossed, name: "Dinner", count: "40 recipes", id: "3" },
    { icon: Cookie, name: "Desserts", count: "18 recipes", id: "4" },
    { icon: Popcorn, name: "Snacks", count: "25 recipes", id: "5" },
  ];

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
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="category-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="icon-wrapper">
                  <Icon className="category-icon" />
                </div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-count">{category.count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Categories.propTypes = {
  onCategoryClick: PropTypes.func,
};

export default Categories;
