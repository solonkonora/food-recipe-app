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
      
      <section className="categories-section">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtext">
              Explore our collection of authentic Cameroonian dishes organized by meal type
            </p>
          </div>
          <Categories />
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

Welcome.propTypes = {
  onGetStarted: PropTypes.func,
};
