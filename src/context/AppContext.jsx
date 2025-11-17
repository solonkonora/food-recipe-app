// import { createContext, useContext, useState, useEffect } from 'react';

// const AppContext = React.createContext();

// const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// function AppContextProvider({ children }) {
//     const [addedRecipes, setAddedRecipes] = useState([]);
//     const [recipes, setRecipes] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const searchRecipes = async (query = "") => {
//         setIsLoading(true);
//         const trimmedQuery = query.trim();
//         const url = apiUrl + trimmedQuery;

//         try {
//             const res = await fetch(url);
//             if (!res.ok) {
//                 throw new Error("Failed to fetch data");
//             }
//             const data = await res.json();
//             setRecipes(data.meals);
//         } catch (error) {
//             console.error(error);
//             // Handle the error state or display an error message to the user
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <AppContext.Provider value={{
//                 searchRecipes,
//                 isLoading,
//                 addedRecipes,
//                 setAddedRecipes,
//                 recipes,
//                 setRecipes,
//             }}>
//             {props.children}
//         </AppContext.Provider>
//     );
// }

// const useAppContext = () => useContext(AppContext);

// export { AppContextProvider, useAppContext, AppContext };






/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/apiClient';

const AppContext = createContext();

function AppContextProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState(null);

    const fetchRecipes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getRecipes();
            setRecipes(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching recipes', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const searchRecipes = useCallback(async (query = '') => {
        // Backend doesn't expose a search endpoint yet — fetch all and filter client-side
        setIsLoading(true);
        setError(null);
        try {
            const all = await api.getRecipes();
            const list = Array.isArray(all) ? all : [];
            const q = query.trim().toLowerCase();
            if (!q) {
                setRecipes(list);
                return;
            }
            const filtered = list.filter((r) => {
                const title = (r.title || '').toString().toLowerCase();
                const desc = (r.description || '').toString().toLowerCase();
                return title.includes(q) || desc.includes(q);
            });
            setRecipes(filtered);
        } catch (err) {
            console.error('Search error', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createRecipe = async (payload) => {
        setIsLoading(true);
        setError(null);
        try {
            const created = await api.createRecipe(payload);
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
                setRecipes,
                fetchRecipes,
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