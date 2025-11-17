import { useEffect } from "react";
import "./App.css";
import SearchBar from "./components/search-bar";
import Home from "./components/home";
import RecipeCard from "./components/recipe-card";
import FavoriteRecipes from "./components/favorite-meal";
import AuthPage from "./components/AuthPage";
import { useAppContext } from "./context/AppContext";
import { useAuth } from "./context/AuthContext";

export default function App() {
    const { recipes, isLoading, fetchRecipes } = useAppContext();
    const { user, loading: authLoading, logout } = useAuth();

    useEffect(() => {
        if (user) {
            fetchRecipes();
        }
    }, [fetchRecipes, user]);

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Show auth page if not logged in
    if (!user) {
        return <AuthPage />;
    }

    // Show recipe dashboard for authenticated users
    return (
        <>
           <Home />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2>Tasty Recipes</h2>
                    <div>
                        <span style={{ marginRight: '1rem' }}>Welcome, {user.email}</span>
                        <button onClick={logout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </div>
                </div>
                <SearchBar />

                <div className="recipes">
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && recipes && recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                recipeName={recipe.title}
                            />
                        ))
                    ) : (
                        !isLoading && <p>No recipes found.</p>
                    )}
                </div>
            </div>

            <div className="sidebar">
                <FavoriteRecipes />
            </div>
        </>
    );
}
