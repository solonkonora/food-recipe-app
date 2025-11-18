import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Trash2, Plus, Upload, X } from "lucide-react";
import api from "../api/apiClient";
import "../assets/styles/add-recipe.css";

export default function AddRecipe() {
  const { createRecipe } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_path: "",
    category_id: "1",
  });
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([
    { step_number: 1, description: "" },
  ]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image_path: "" }));
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.uploadImage(formData);
      return response.url;
    } catch (err) {
      console.error("Image upload error:", err);
      throw new Error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index].description = value;
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { step_number: instructions.length + 1, description: "" },
    ]);
  };

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const updated = instructions
        .filter((_, i) => i !== index)
        .map((inst, i) => ({ ...inst, step_number: i + 1 }));
      setInstructions(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate ingredients
    const validIngredients = ingredients.filter(
      (ing) => ing.name.trim() && ing.quantity.trim()
    );
    if (validIngredients.length === 0) {
      setError("Please add at least one ingredient with name and quantity.");
      return;
    }

    // Validate instructions
    const validInstructions = instructions.filter(
      (inst) => inst.description.trim()
    );
    if (validInstructions.length === 0) {
      setError("Please add at least one cooking instruction.");
      return;
    }

    setLoading(true);

    try {
      // Upload image first if a file is selected
      let imageUrl = formData.image_path;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      await createRecipe(
        {
          ...formData,
          image_path: imageUrl,
          category_id: parseInt(formData.category_id),
        },
        validIngredients,
        validInstructions
      );
      setSuccess("Recipe created successfully! 🎉");
      // Reset form
      setFormData({
        title: "",
        description: "",
        image_path: "",
        category_id: "1",
      });
      setIngredients([{ name: "", quantity: "", unit: "" }]);
      setInstructions([{ step_number: 1, description: "" }]);
      removeImage();
    } catch (err) {
      console.error("Error creating recipe:", err);
      setError(err.response?.error || err.message || "Failed to create recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2 className="add-recipe-title">Add New Recipe</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="form-group">
          <label htmlFor="title">Food Name *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Jollof Rice"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your recipe..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Recipe Image</label>
          <div className="image-upload-container">
            {!imagePreview ? (
              <label htmlFor="image-input" className="upload-label">
                <Upload size={24} />
                <span>Click to upload image</span>
                <span className="upload-hint">(Max 5MB, JPG/PNG)</span>
              </label>
            ) : (
              <div className="image-preview-wrapper">
                <img src={imagePreview} alt="Preview" className="uploaded-image" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="remove-image-button"
                  aria-label="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Category *</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
            <option value="4">Dessert</option>
            <option value="5">Snacks</option>
          </select>
        </div>

        {/* Ingredients Section */}
        <div className="form-section">
          <div className="section-header">
            <h3>Ingredients *</h3>
            <button
              type="button"
              onClick={addIngredient}
              className="add-button"
            >
              <Plus size={18} /> Add Ingredient
            </button>
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="dynamic-field-group">
              <input
                type="text"
                placeholder="Ingredient name (e.g., Tomatoes)"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="field-input"
              />
              <input
                type="text"
                placeholder="Quantity (e.g., 2)"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                className="field-input small"
              />
              <input
                type="text"
                placeholder="Unit (e.g., cups)"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                className="field-input small"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="remove-button"
                  aria-label="Remove ingredient"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="form-section">
          <div className="section-header">
            <h3>Cooking Instructions *</h3>
            <button
              type="button"
              onClick={addInstruction}
              className="add-button"
            >
              <Plus size={18} /> Add Step
            </button>
          </div>
          {instructions.map((instruction, index) => (
            <div key={index} className="dynamic-field-group">
              <div className="step-number">Step {instruction.step_number}</div>
              <textarea
                placeholder="Describe this cooking step..."
                value={instruction.description}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="field-textarea"
                rows="3"
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="remove-button"
                  aria-label="Remove instruction"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button" disabled={loading || uploadingImage}>
          {uploadingImage ? "Uploading image..." : loading ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
}
