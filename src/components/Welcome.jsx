import PropTypes from "prop-types";
import Home from "./home";
import FeaturedRecipes from "./featuredRecipes";
import Footer from "./footer";
import Categories from "./catergories";

export default function Welcome({ onGetStarted, onCategoryClick, onLoginRequired }) {
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
  onLoginRequired: PropTypes.func,
};
