import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const SearchBar = () => {
  const { searchRecipes } = useAppContext();

  const [query, setQuery] = useState("");

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

    const intId = setTimeout(() => {
      searchRecipes(trimmedQuery);
    }, 1000);

    return () => {
      console.log("interval cleared");
      clearTimeout(intId);
    };
  }, [query, searchRecipes]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Recipes"
        className="form-control"
      />
      <input type="submit" className="btn" value="Search" />
    </form>
  );
};

export default SearchBar;