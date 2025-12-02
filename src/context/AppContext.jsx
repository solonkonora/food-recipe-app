/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/apiClient';

const AppContext = createContext();

function AppContextProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]); // Store unfiltered recipes
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Track current search

    const fetchCategories = useCallback(async () => {
        try {
            const data = await api.getCategories();
            const categoryList = Array.isArray(data) ? data : [];
            setCategories(categoryList);
        } catch (err) {
            console.error('Error fetching categories', err);
        }
    }, []);

    const fetchRecipes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getRecipes();
            const recipeList = Array.isArray(data) ? data : [];
            setAllRecipes(recipeList);
            setRecipes(recipeList);
            setSearchQuery(''); // Reset search when fetching all
        } catch (err) {
            console.error('Error fetching recipes', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const searchRecipes = useCallback(async (query = '') => {
        // Backend doesn't expose a search endpoint yet — fetch all and filter client-side
        const q = query.trim().toLowerCase();
        setSearchQuery(q);
        
        // Use allRecipes if available, otherwise fetch
        let recipeList = allRecipes;
        if (recipeList.length === 0) {
            setIsLoading(true);
            setError(null);
            try {
                const all = await api.getRecipes();
                recipeList = Array.isArray(all) ? all : [];
                setAllRecipes(recipeList);
            } catch (err) {
                console.error('Search error', err);
                setError(err);
                setIsLoading(false);
                return;
            } finally {
                setIsLoading(false);
            }
        }
        
        if (!q) {
            setRecipes(recipeList);
            return;
        }
        
        const filtered = recipeList.filter((r) => {
            const title = (r.title || '').toString().toLowerCase();
            const desc = (r.description || '').toString().toLowerCase();
            return title.includes(q) || desc.includes(q);
        });
        setRecipes(filtered);
    }, [allRecipes]);

    const createRecipe = async (payload, ingredients = [], instructions = []) => {
        setIsLoading(true);
        setError(null);
        try {
            // Create recipe first
            const created = await api.createRecipe(payload);
            const recipeId = created.id;

            // Create ingredients if provided
            if (ingredients.length > 0) {
                await api.createIngredients(recipeId, ingredients);
            }

            // Create instructions if provided
            if (instructions.length > 0) {
                await api.createInstructions(recipeId, instructions);
            }

            // refresh list
            await fetchRecipes();
            return created;
        } catch (err) {
            console.error('Create recipe error', err);
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateRecipe = async (id, payload) => {
        setIsLoading(true);
        setError(null);
        try {
            const updated = await api.updateRecipe(id, payload);
            await fetchRecipes();
            return updated;
        } catch (err) {
            console.error('Update recipe error', err);
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const removeRecipe = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const deleted = await api.deleteRecipe(id);
            await fetchRecipes();
            return deleted;
        } catch (err) {
            console.error('Delete recipe error', err);
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const openRecipe = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const r = await api.getRecipe(id);
            setSelectedRecipe(r);
        } catch (err) {
            console.error('Open recipe error', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const closeRecipe = () => setSelectedRecipe(null);

    return (
        <AppContext.Provider
            value={{
                isLoading,
                recipes,
                allRecipes,
                categories,
                searchQuery,
                setRecipes,
                fetchRecipes,
                fetchCategories,
                searchRecipes,
                createRecipe,
                updateRecipe,
                removeRecipe,
                selectedRecipe,
                openRecipe,
                closeRecipe,
                error,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

AppContextProvider.propTypes = {
    children: PropTypes.node,
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
export default AppContext;