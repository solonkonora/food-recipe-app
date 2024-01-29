import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import RecipeCard from "./components/recipeCard";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // // fetching data
  // const searchRecipes = async () => {
  //   setIsLoading(true);
  //   const url = apiUrl + query;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   setRecipes(data.meals);
  //   setIsLoading(false);
  // };

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = apiUrl + query;
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

  useEffect(() => {
    searchRecipes();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <div className="container">
      <h2>Le Recipees</h2>

      <SearchBar
        handleSubmit={handleSubmit}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        isLoading={isLoading}
      />

      <div className="recipes">
        {recipes ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No Recipes!</p>
        )}
      </div>
    </div>
  );
}

export default App;


// eslint-disable-next-line no-unused-vars
// import React from "react";
// import { useState, useEffect } from "react";
// import "./App.css";
// import SearchBar from "./components/searchBar";
// import RecipeCard from "./components/recipeCard";
// import react from "@vitejs/plugin-react-swc";

// const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// // Error Boundary component
// class ErrorBoundary extends react.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   // Handle errors thrown in child components
//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by ErrorBoundary:", error, errorInfo);
//     this.setState({ hasError: true });
//   }

//   render() {
//     if (this.state.hasError) {
//       return <p>Something went wrong.</p>; // Render an error message
//     }

//     // eslint-disable-next-line react/prop-types
//     return this.props.children; // Render the wrapped components
//   }
// }

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [recipes, setRecipes] = useState([]);

//   // fetching data
//   const searchRecipes = async () => {
//     setIsLoading(true);
//     const url = apiUrl + query;
//     const res = await fetch(url);
//     const data = await res.json();
//     setRecipes(data.meals);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     searchRecipes();
//   }, );

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     searchRecipes();
//   };

//   return (
//     <div className="container">
//       <h2>Le Recipees</h2>

//       <ErrorBoundary> {/* Wrap the error boundary around the components */}
//         <SearchBar
//           handleSubmit={handleSubmit}
//           value={query}
//           onChange={(event) => setQuery(event.target.value)}
//           isLoading={isLoading}
//         />

//         <div className="recipes">
//           {recipes ? (
//             recipes.map((recipe) => (
//               <RecipeCard key={recipe.idMeal} recipe={recipe} />
//             ))
//           ) : (
//             <p>No Recipes!</p>
//           )}
//         </div>
//       </ErrorBoundary>
//     </div>
//   );
// }

// export default App;