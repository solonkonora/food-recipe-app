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
  const { id, title, image_path, description } = recipe || {};
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loadingInstructions, setLoadingInstructions] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

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

  const handleDialogToggle = async () => {
    if (!dialogOpen) {
      // Fetch ingredients and instructions when opening dialog
      setLoadingIngredients(true);
      setLoadingInstructions(true);
      
      try {
        const [ingredientsData, instructionsData] = await Promise.all([
          api.getIngredients(id),
          api.getInstructions(id)
        ]);
        setIngredients(ingredientsData || []);
        setInstructions(instructionsData || []);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setIngredients([]);
        setInstructions([]);
      } finally {
        setLoadingIngredients(false);
        setLoadingInstructions(false);
      }
    }
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
          <h3>{recipeName || title}</h3>
          <button className="details-button" onClick={handleDialogToggle}>
            Details
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {dialogOpen && (
        <>
          <div className="modal-overlay" onClick={handleDialogToggle} />
          <div className="dialog">
            <h4>Recipe Details</h4>
            <p>
              <strong>Name:</strong> {title}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            
            <div>
              <h5>Ingredients</h5>
              {loadingIngredients ? (
                <p style={{ fontStyle: 'italic', color: '#6b7280' }}>Loading ingredients...</p>
              ) : ingredients.length > 0 ? (
                <ul className="ingredients-list">
                  {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      <span className="ingredient-quantity">{ingredient.quantity} {ingredient.unit}</span>
                      {' '}
                      <span className="ingredient-name">{ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: 'italic', color: '#6b7280' }}>
                  No ingredients available for this recipe.
                </p>
              )}
            </div>
            
            <div>
              <h5>Step-by-Step Instructions</h5>
              {loadingInstructions ? (
                <p style={{ fontStyle: 'italic', color: '#6b7280' }}>Loading instructions...</p>
              ) : instructions.length > 0 ? (
                <ol>
                  {instructions.map((instruction) => (
                    <li key={instruction.id}>
                      {instruction.description}
                    </li>
                  ))}
                </ol>
              ) : (
                <p style={{ fontStyle: 'italic', color: '#6b7280' }}>
                  No instructions available for this recipe.
                </p>
              )}
            </div>
            
            <button className="close-dialog-button" onClick={handleDialogToggle}>
              Close
            </button>
          </div>
        </>
      )}
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
