import "../assets/styles/recipeCard.css";
import { Clock, Users } from "lucide-react";
import PropTypes from "prop-types";

const RecipeCard = ({ title, image, time, servings, category }) => {
  return (
    <article className="recipe-card cursor-pointer group">
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
      </div>
    </article>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  servings: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default RecipeCard;
