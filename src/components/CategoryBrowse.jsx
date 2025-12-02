import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipesByCategory from "./RecipesByCategory";
import Footer from "./footer";

export default function CategoryBrowse({ onLoginRequired, onGetStarted }) {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Capitalize first letter for display
  const displayCategory = categoryName 
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "All";

  return (
    <div className="browse-page">
      <div className="public-header">
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
          LocalBite
        </h2>
        <button onClick={onGetStarted} className="login-button">
          Login / Sign Up
        </button>
      </div>
      <RecipesByCategory 
        publicView={true}
        selectedCategory={displayCategory}
        onLoginRequired={onLoginRequired}
      />
      <Footer />
    </div>
  );
}

CategoryBrowse.propTypes = {
  onLoginRequired: PropTypes.func,
  onGetStarted: PropTypes.func,
};
