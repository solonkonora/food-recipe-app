import PropTypes from "prop-types";
import Home from "./home";
import FeaturedRecipes from "./featuredRecipes";
import Footer from "./footer";
import Categories from "./catergories";

export default function Welcome({ onGetStarted }) {
  return (
    <div className="welcome-page">
      <Home onGetStarted={onGetStarted} />
      
      <FeaturedRecipes />
      
      <Categories />
      
      <Footer />
    </div>
  );
}

Welcome.propTypes = {
  onGetStarted: PropTypes.func,
};
