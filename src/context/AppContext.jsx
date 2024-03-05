import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function AppContextProvider({ children }) {
    const [addedRecipes, setAddedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const [isLoading, setIsLoading] = useState(false); // a boolean variable to track the boolean state

    const searchRecipes = async (query) => {
        setIsLoading(true);
        const url = apiUrl + query.trim();

        console.log(query);

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
                // functions
                searchRecipes,

                // stateVariables
                isLoading,
                setIsLoading,

                addedRecipes,
                setAddedRecipes,

                recipes,
                setRecipes,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => useContext(AppContext);

export {
    AppContextProvider,
    useAppContext
}
