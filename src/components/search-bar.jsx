import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import "../assets/styles/search-bar.css";


// const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const SearchBar = () => {
  const { searchRecipes } = useAppContext();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes(query);
  };

  useEffect(() => {
    if (query === "") {
      searchRecipes();
      return;
    }

    if (!query.trim) return;

    const trimmedQuery = query.trim();

    setError(null);

    const intId = setTimeout(() => {
      searchRecipes(trimmedQuery)
        .catch((error) => {
          setError(error.message);
        });
    }, 1000);

    return () => {
      console.log("interval cleared");
      clearTimeout(intId);
    };
  }, [query, searchRecipes]);

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="form-control"
        />
      </form>
      {error && <p className="search-error">Error: {error}</p>}
    </div>
  );
};

export default SearchBar;