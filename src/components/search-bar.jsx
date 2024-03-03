import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const SearchBar = () => {
  const { searchRecipes } = useAppContext();

  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  }

  useEffect(() => {

    if (query === '') {
      searchRecipes();
      return;
    };

    if (!query.trim()) return;

    const intId = setTimeout(() => {
      searchRecipes(query);
    }, 1000);

    return () => {
      console.log('interval cleared')
      clearTimeout(intId);
    }
  }, [query]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        // disabled={isLoading}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Recipes"
        className="form-control"
      />
      <input
        // disabled={isLoading}
        type="submit"
        className="btn"
        value="Search"
      />
    </form>
  );
};

export default SearchBar;
