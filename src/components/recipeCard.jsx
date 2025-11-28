import { useState } from "react";
import "../assets/styles/recipeCard.css";
import { Clock, Users, ArrowRight, X } from "lucide-react";
import PropTypes from "prop-types";

const RecipeCardHome = ({ title, image, time, servings, category }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
  };

  return (
    <>
      <article className="recipe-card cursor-pointer group">
        <div className="recipe-image-wrapper" onClick={handleImageClick}>
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

    {showImageModal && (
      <div className="image-modal-overlay" onClick={handleCloseModal}>
        <div className="image-modal-content">
          <button 
            className="image-modal-close" 
            onClick={handleCloseModal}
            aria-label="Close image"
          >
            <X size={24} />
          </button>
          <img 
            src={image} 
            alt={title}
            className="image-modal-img"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="image-modal-caption">{title}</div>
        </div>
      </div>
    )}
    </>
  );
};

RecipeCardHome.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  servings: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default RecipeCardHome;
