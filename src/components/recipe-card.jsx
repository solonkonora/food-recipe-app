import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import api from "../api/apiClient";
import "../assets/styles/recipe-card.css";

const RecipeCard = ({ recipe, recipeName }) => {
  const { id, title, image_path, category_id, description } = recipe || {};
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);

  useEffect(() => {
    // Check if the recipe is favorited via backend
    const checkFavoriteStatus = async () => {
      try {
        const { isFavorite: favStatus } = await api.checkFavorite(id);
        setIsFavorite(favStatus);
      } catch (err) {
        console.error("Error checking favorite status:", err);
      } finally {
        setCheckingFavorite(false);
      }
    };

    if (id) {
      checkFavoriteStatus();
    }
  }, [id]);

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.removeFavorite(id);
        setIsFavorite(false);
      } else {
        await api.addFavorite(id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return (
    <>
        <div className="card">
        <div
          className={`favorite-icon ${isFavorite ? 'favorite' : ''}`}
          onClick={handleToggleFavorite}
          style={{ opacity: checkingFavorite ? 0.5 : 1 }}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartRegular} />
        </div>
        <img src={image_path} alt={title} className="card-image" />
        <div className="card-body">
          <span className="category">{category_id}</span>
          <h3>{recipeName || title}</h3>
          <button className="details-button" onClick={handleDialogToggle}>
            Details
          </button>
        </div>
        {dialogOpen && (
          <div className="dialog">
            <h4>Recipe Details</h4>
            <p>
              <strong>Name:</strong> {title}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <button className="close-dialog-button" onClick={handleDialogToggle}>
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    image_path: PropTypes.string,
    description: PropTypes.string,
  }),
  recipeName: PropTypes.string,
};

export default RecipeCard;
