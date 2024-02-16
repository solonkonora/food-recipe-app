// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ 
  value,
  // isLoading, 
  handleSubmit, 
  onChange 
}) => {
    
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        // disabled={isLoading}
        onChange={onChange}
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


SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
