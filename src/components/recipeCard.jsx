import "../assets/styles/recipeCard.css";
import { Clock, Users, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const RecipeCardHome = ({ title, image, time, servings, category }) => {
  const handleClick = () => {
    // For now, these are static display cards
    // later, could link to actual recipe details
    console.log('Recipe clicked:', title);
  };

  return (
    <article className="recipe-card cursor-pointer group" onClick={handleClick}>
      <div className="recipe-image-wrapper">
        <img 
          src={image} 
          alt={title}
          className="recipe-image"
        />

        <div className="recipe-category-badge">
          <span className="badge">{category}</span>
        </div>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title group-hover:text-primary">
          {title}
        </h3>
        
        <div className="recipe-meta text-muted-foreground">
          <div className="meta-item">
            <Clock className="icon" />
            <span>{time}</span>
          </div>
          <div className="meta-item">
            <Users className="icon" />
            <span>{servings} servings</span>
          </div>
        </div>
        
        <div className="recipe-card-arrow">
          <ArrowRight size={18} />
        </div>
      </div>
    </article>
  );
};

RecipeCardHome.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  servings: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onLoginRequired: PropTypes.func,
};

export default RecipeCardHome;
