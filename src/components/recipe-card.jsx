import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'font-awesome/css/font-awesome.min.css';
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/recipe-card.css";

const RecipeCard = ({ recipe, recipeName, onRecipeDeleted }) => {
  const { id, title, image_path, description, user_id } = recipe || {};
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loadingInstructions, setLoadingInstructions] = useState(false);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editedData, setEditedData] = useState({
    title: '',
    description: '',
  });

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
      
      // Initialize edit data
      setEditedData({
        title: title || '',
        description: description || '',
      });
      
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
    setEditMode(false); // Reset edit mode when closing
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

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedData({
      title: title || '',
      description: description || '',
    });
  };

  const handleSaveEdit = async () => {
    try {
      await api.updateRecipe(id, {
        title: editedData.title,
        description: editedData.description,
      });
      
      // Update local recipe data
      recipe.title = editedData.title;
      recipe.description = editedData.description;
      
      setEditMode(false);
      alert('Recipe updated successfully!');
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert(err.response?.error || 'Failed to update recipe. You can only edit recipes you created.');
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      await api.deleteRecipe(id);
      alert('Recipe deleted successfully!');
      setDialogOpen(false);
      
      // Notify parent component to refresh list
      if (onRecipeDeleted) {
        onRecipeDeleted(id);
      }
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert(err.response?.error || 'Failed to delete recipe. You can only delete recipes you created.');
    } finally {
      setDeleting(false);
    }
  };

  const isOwner = user && user.id === user_id;

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
            <div className="dialog-header">
              <h4>Recipe Details</h4>
              {isOwner && !editMode && (
                <div className="dialog-actions">
                  <button 
                    className="icon-button edit-button" 
                    onClick={handleEditClick}
                    title="Edit Recipe"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="icon-button delete-button" 
                    onClick={handleDeleteClick}
                    disabled={deleting}
                    title="Delete Recipe"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label htmlFor="edit-title">Title:</label>
                  <input
                    id="edit-title"
                    type="text"
                    value={editedData.title}
                    onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-description">Description:</label>
                  <textarea
                    id="edit-description"
                    value={editedData.description}
                    onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                    className="edit-textarea"
                    rows="4"
                  />
                </div>
                <div className="edit-actions">
                  <button className="save-button" onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
            
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
    user_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  recipeName: PropTypes.string,
  onRecipeDeleted: PropTypes.func,
};

export default RecipeCard;
