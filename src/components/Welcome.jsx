import PropTypes from "prop-types";
import Home from "./home";
import FeaturedRecipes from "./featuredRecipes";
import Footer from "./footer";
import Categories from "./catergories";
import RecipesByCategory from "./RecipesByCategory";

export default function Welcome({ onGetStarted, onCategoryClick, selectedCategory, onLoginRequired, currentView, onBackToHome }) {
  // if browsing a specific category, show the recipes view
  if (currentView === 'browse' && selectedCategory) {
    return (
      <div className="browse-page">
        <div className="public-header">
          <h2 onClick={onBackToHome} style={{ cursor: 'pointer' }}>LocalBite</h2>
          <button onClick={onGetStarted} className="login-button">
            Login / Sign Up
          </button>
        </div>
        <RecipesByCategory 
          publicView={true}
          selectedCategory={selectedCategory}
          onLoginRequired={onLoginRequired}
        />
        <Footer />
      </div>
    );
  }

  // default welcome page
  return (
    <div className="welcome-page">
      <Home onGetStarted={onGetStarted} />
      
      <FeaturedRecipes onLoginRequired={onLoginRequired} />
      
      <Categories onCategoryClick={onCategoryClick} />
      
      <Footer />
    </div>
  );
}

Welcome.propTypes = {
  onGetStarted: PropTypes.func,
  onCategoryClick: PropTypes.func,
  selectedCategory: PropTypes.string,
  onLoginRequired: PropTypes.func,
  currentView: PropTypes.string,
  onBackToHome: PropTypes.func,
};
