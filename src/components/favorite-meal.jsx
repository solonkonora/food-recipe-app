import { useState, useEffect } from "react";
import api from "../api/apiClient";

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
            <div>
                <h2>Favorite Recipes</h2>
                <p>Loading favorites...</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Favorite Recipes</h2>
            {favorites.length === 0 ? (
                <p>No favorite recipes found.</p>
            ) : (
                <div className="favorite-recipes">
                    {favorites.map((recipe) => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            {recipe.image_path && (
                                <img src={recipe.image_path} alt={recipe.title} style={{width:120}} />
                            )}
                            <button onClick={() => removeFavorite(recipe.id)}>
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteRecipes;