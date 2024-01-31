// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ 
    value,
    isLoading, 
    handleSubmit, 
    onChange 
}) => {
    
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        disabled={isLoading}
        onChange={onChange}
        placeholder="Search Recipes"
        className="form-control"
      />
      <input
      // disabled when the app is fetching data and also when there is no data in the input
        disabled={isLoading || !value}
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


// // eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// const SearchBar = ({ value, isLoading, handleSubmit, onChange }) => {
//   const [inputValue, setInputValue] = useState(value);
//   const [timeoutId, setTimeoutId] = useState(null);

//   useEffect(() => {
//     clearTimeout(timeoutId);
//     const debounceDelay = 3000; // Debounce time: 3 seconds
//     const newTimeoutId = setTimeout(() => {
//       handleSubmit();
//     }, debounceDelay);
//     setTimeoutId(newTimeoutId);

//     return () => {
//       clearTimeout(newTimeoutId);
//     };
//   }, [inputValue, handleSubmit]);

//   // eslint-disable-next-line no-unused-vars
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const debouncedOnChange = (event) => {
//     clearTimeout(timeoutId);
//     const newInputValue = event.target.value;
//     setInputValue(newInputValue);
//     const debounceDelay = 3000; // Debounce time: 3 seconds
//     const newTimeoutId = setTimeout(() => {
//       onChange(newInputValue);
//     }, debounceDelay);
//     setTimeoutId(newTimeoutId);
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     handleSubmit();
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         value={inputValue}
//         disabled={isLoading}
//         onChange={debouncedOnChange}
//         placeholder="Search Recipes"
//         className="form-control"
//       />
//       <input
//         disabled={isLoading || !inputValue}
//         type="submit"
//         className="btn"
//         value="Search"
//       />
//     </form>
//   );
// };

// SearchBar.propTypes = {
//   value: PropTypes.string.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default SearchBar;
