import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function AppContextProvider({ children }) {
    const [addedRecipes, setAddedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const searchRecipes = async (query = "") => {
        setIsLoading(true);
        const trimmedQuery = query.trim();
        const url = apiUrl + trimmedQuery;

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setRecipes(data.meals);
        } catch (error) {
            console.error(error);
            // Handle the error state or display an error message to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppContext.Provider
            value={{
                searchRecipes,
                isLoading,
                addedRecipes,
                setAddedRecipes,
                recipes,
                setRecipes,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
