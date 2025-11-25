import "../assets/styles/featuredRecipes.css";
import RecipeCardHome from "./recipeCard";

const FeaturedRecipes = () => {
  const recipes = [
    {
      title: "Ndolé",
      image: "https://res.cloudinary.com/drs0ewxd1/image/upload/v1/cameroon-recipes/lunch/ndole.jpeg",
      time: "1.5 hours",
      servings: "6",
      category: "Lunch"
    },
    {
      title: "Kati Kati",
      image: "https://res.cloudinary.com/drs0ewxd1/image/upload/v1/cameroon-recipes/lunch/kati_kati.png",
      time: "45 min",
      servings: "4",
      category: "Lunch"
    },
    {
      title: "Achu Soup",
      image: "https://res.cloudinary.com/drs0ewxd1/image/upload/v1/cameroon-recipes/lunch/achu.jpg",
      time: "2 hours",
      servings: "6",
      category: "Lunch"
    }
  ];

  return (
    <section className="py-16 md:py-24 featured-section">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Recipes</h2>
          <p className="featured-subtext">
            Authentic Cameroonian dishes that bring the taste of home to your table
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RecipeCardHome {...recipe} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedRecipes;
