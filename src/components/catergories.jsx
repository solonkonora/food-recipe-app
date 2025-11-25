import { Coffee, Sandwich, UtensilsCrossed, Cookie, Popcorn } from "lucide-react";
import "./Categories.css";

const Categories = () => {
  const categories = [
    { icon: Coffee, name: "Breakfast", count: "20 recipes" },
    { icon: Sandwich, name: "Lunch", count: "35 recipes" },
    { icon: UtensilsCrossed, name: "Dinner", count: "40 recipes" },
    { icon: Cookie, name: "Desserts", count: "18 recipes" },
    { icon: Popcorn, name: "Snacks", count: "25 recipes" },
  ];

  return (
    <section id="categories" className="categories-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Recipe Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of recipes organized by meal type.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="category-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="icon-wrapper">
                  <Icon className="h-8 w-8 text-primary" />
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

export default Categories;
