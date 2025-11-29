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
  const [newImage, setNewImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editedData, setEditedData] = useState({
    title: '',
    description: '',
  });
  const [editedIngredients, setEditedIngredients] = useState([]);
  const [editedInstructions, setEditedInstructions] = useState([]);

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
        const ingredientsList = ingredientsData || [];
        const instructionsList = instructionsData || [];
        
        setIngredients(ingredientsList);
        setInstructions(instructionsList);
        setEditedIngredients(ingredientsList.map(ing => ({ ...ing })));
        setEditedInstructions(instructionsList.map(inst => ({ ...inst })));
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
    setNewImage(null);
    setEditedData({
      title: title || '',
      description: description || '',
    });
    setEditedIngredients(ingredients.map(ing => ({ ...ing })));
    setEditedInstructions(instructions.map(inst => ({ ...inst })));
  };

  const handleSaveEdit = async () => {
    try {
      let imageUrl = recipe.image_path;
      
      // Upload new image if one was selected
      if (newImage) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append('image', newImage);
        
        try {
          const response = await api.uploadImage(formData);
          imageUrl = response.url;
        } catch (uploadErr) {
          console.error('Error uploading image:', uploadErr);
          alert('Failed to upload image. Continuing without image update.');
        } finally {
          setUploadingImage(false);
        }
      }
      
      // Update recipe basic info (preserve image_path and category_id)
      await api.updateRecipe(id, {
        title: editedData.title,
        description: editedData.description,
        image_path: imageUrl,
        category_id: recipe.category_id,
      });
      
      // Update ingredients
      for (const ingredient of editedIngredients) {
        if (ingredient.id) {
          await api.updateIngredient(ingredient.id, {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit
          });
        } else {
          // New ingredient
          await api.createIngredients(id, [{
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit
          }]);
        }
      }
      
      // Update instructions
      for (const instruction of editedInstructions) {
        if (instruction.id) {
          await api.updateInstruction(instruction.id, {
            step_number: instruction.step_number,
            description: instruction.description
          });
        } else {
          // New instruction
          await api.createInstructions(id, [{
            step_number: instruction.step_number,
            description: instruction.description
          }]);
        }
      }
      
      // Update local recipe data
      recipe.title = editedData.title;
      recipe.description = editedData.description;
      recipe.image_path = imageUrl;
      setIngredients([...editedIngredients]);
      setInstructions([...editedInstructions]);
      
      setEditMode(false);
      setNewImage(null);
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

                <div className="form-group">
                  <label htmlFor="edit-image">Image:</label>
                  <input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    className="edit-input"
                  />
                  {newImage && (
                    <div className="image-preview">
                      <small>New image selected: {newImage.name}</small>
                    </div>
                  )}
                  {!newImage && (
                    <div className="current-image-note">
                      <small>Current image will be kept if no new image is selected</small>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Ingredients:</label>
                  {editedIngredients.map((ingredient, index) => (
                    <div key={ingredient.id || `new-${index}`} className="edit-ingredient-row">
                      <input
                        type="text"
                        placeholder="Name"
                        value={ingredient.name}
                        onChange={(e) => {
                          const updated = [...editedIngredients];
                          updated[index].name = e.target.value;
                          setEditedIngredients(updated);
                        }}
                        className="edit-input-small"
                      />
                      <input
                        type="text"
                        placeholder="Quantity"
                        value={ingredient.quantity}
                        onChange={(e) => {
                          const updated = [...editedIngredients];
                          updated[index].quantity = e.target.value;
                          setEditedIngredients(updated);
                        }}
                        className="edit-input-small"
                      />
                      <input
                        type="text"
                        placeholder="Unit"
                        value={ingredient.unit}
                        onChange={(e) => {
                          const updated = [...editedIngredients];
                          updated[index].unit = e.target.value;
                          setEditedIngredients(updated);
                        }}
                        className="edit-input-small"
                      />
                      <button
                        type="button"
                        onClick={() => setEditedIngredients(editedIngredients.filter((_, i) => i !== index))}
                        className="remove-item-button"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditedIngredients([...editedIngredients, { name: '', quantity: '', unit: '' }])}
                    className="add-item-button"
                  >
                    + Add Ingredient
                  </button>
                </div>

                <div className="form-group">
                  <label>Instructions:</label>
                  {editedInstructions.map((instruction, index) => (
                    <div key={instruction.id || `new-${index}`} className="edit-instruction-row">
                      <span className="step-label">Step {index + 1}:</span>
                      <textarea
                        value={instruction.description}
                        onChange={(e) => {
                          const updated = [...editedInstructions];
                          updated[index].description = e.target.value;
                          updated[index].step_number = index + 1;
                          setEditedInstructions(updated);
                        }}
                        className="edit-textarea-small"
                        rows="2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editedInstructions.filter((_, i) => i !== index);
                          // Renumber steps
                          updated.forEach((inst, i) => inst.step_number = i + 1);
                          setEditedInstructions(updated);
                        }}
                        className="remove-item-button"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditedInstructions([...editedInstructions, { step_number: editedInstructions.length + 1, description: '' }])}
                    className="add-item-button"
                  >
                    + Add Step
                  </button>
                </div>

                <div className="edit-actions">
                  <button 
                    className="save-button" 
                    onClick={handleSaveEdit}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? 'Uploading Image...' : 'Save Changes'}
                  </button>
                  <button 
                    className="cancel-button" 
                    onClick={handleCancelEdit}
                    disabled={uploadingImage}
                  >
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                      <p style={{ fontStyle: 'italic', color: '#6b7280', margin: 0 }}>Loading ingredients...</p>
                    </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                      <p style={{ fontStyle: 'italic', color: '#6b7280', margin: 0 }}>Loading instructions...</p>
                    </div>
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
    category_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  recipeName: PropTypes.string,
  onRecipeDeleted: PropTypes.func,
};

export default RecipeCard;
