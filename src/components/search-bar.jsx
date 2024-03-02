//eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppContext";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const SearchBar = () => {
  const { searchRecipes } = useAppContext();

  const [query, setQuery] = useState("");

  //   const handleSubmit = (e) => {
  //     // e.preventDefault();
  //     searchRecipes();
  //   };

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


// SearchBar.propTypes = {
//   value: PropTypes.string.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default SearchBar;


// import React, { useEffect } from "react";
// import PropTypes from "prop-types";

// const SearchBar = ({ value, handleSubmit, onChange }) => {
//   useEffect(() => {
//     handleSubmit();
//   }, [value, handleSubmit]);

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={value}
//         onChange={onChange}
//         placeholder="Search Recipes"
//         className="form-control"
//       />
//       <input type="submit" className="btn" value="Search" />
//     </form>
//   );
// };

// SearchBar.propTypes = {
//   value: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default SearchBar;
