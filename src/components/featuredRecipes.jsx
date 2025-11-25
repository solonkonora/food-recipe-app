import "./FeaturedRecipes.css";
import RecipeCard from "./RecipeCard";

import pastaImage from "@/assets/recipe-pasta.jpg";
import stewImage from "@/assets/recipe-stew.jpg";
import breadImage from "@/assets/recipe-bread.jpg";

const FeaturedRecipes = () => {
  const recipes = [
    {
      title: "Grandma's Homemade Pasta",
      image: pastaImage,
      time: "45 min",
      servings: "4",
      category: "Italian"
    },
    {
      title: "Traditional Beef Stew",
      image: stewImage,
      time: "2 hours",
      servings: "6",
      category: "Comfort Food"
    },
    {
      title: "Artisan Sourdough Bread",
      image: breadImage,
      time: "24 hours",
      servings: "8",
      category: "Baking"
    }
  ];

  return (
    <section className="py-16 md:py-24 featured-section">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Recipes</h2>
          <p className="featured-subtext">
            Time-tested family favorites that bring warmth to every table
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RecipeCard {...recipe} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedRecipes;
