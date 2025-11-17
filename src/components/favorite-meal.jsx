import { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import api from "../api/apiClient";
import "../assets/styles/favorites.css";

const FavoriteRecipes = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const data = await api.getFavorites();
            setFavorites(data);
        } catch (err) {
            console.log("Error fetching favorites:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const removeFavorite = async (recipeId) => {
        try {
            await api.removeFavorite(recipeId);
            // Update local state
            setFavorites((prev) => prev.filter((fav) => fav.id !== recipeId));
        } catch (err) {
            console.error("Error removing favorite:", err);
        }
    };

    if (loading) {
        return (
            <div className="favorites-container">
                <div className="favorites-header">
                    <Heart size={28} color="#dc2626" fill="#dc2626" />
                    <h2 className="favorites-title">My Favorite Recipes</h2>
                </div>
                <div className="favorites-loading-container">
                    <div className="favorites-spinner"></div>
                    <p className="favorites-loading-text">Loading your favorites...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <Heart size={28} color="#dc2626" fill="#dc2626" />
                <h2 className="favorites-title">My Favorite Recipes</h2>
            </div>
            {favorites.length === 0 ? (
                <div className="favorites-empty-state">
                    <Heart size={64} color="#d1d5db" strokeWidth={1} />
                    <p className="favorites-empty-text">No favorite recipes yet.</p>
                    <p className="favorites-empty-subtext">
                        Start adding recipes to your favorites by clicking the heart icon!
                    </p>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((recipe) => (
                        <div key={recipe.id} className="favorite-recipe-card">
                            <div className="favorite-recipe-image-container">
                                {recipe.image_path && (
                                    <img 
                                        src={recipe.image_path} 
                                        alt={recipe.title} 
                                        className="favorite-recipe-image"
                                    />
                                )}
                            </div>
                            <div className="favorite-recipe-body">
                                <h3 className="favorite-recipe-title">{recipe.title}</h3>
                                {recipe.description && (
                                    <p className="favorite-recipe-description">
                                        {recipe.description.length > 80 
                                            ? `${recipe.description.substring(0, 80)}...` 
                                            : recipe.description}
                                    </p>
                                )}
                                <button 
                                    onClick={() => removeFavorite(recipe.id)}
                                    className="favorite-remove-button"
                                >
                                    <Trash2 size={16} />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteRecipes;