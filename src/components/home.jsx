import "../assets/styles/home.css";
import { Search, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const heroImage = "https://res.cloudinary.com/drs0ewxd1/image/upload/v1/cameroon-recipes/lunch/kati-kati.png";

const Hero = ({ onGetStarted }) => {
  return (
    <section className="hero-section">
      <div 
        className="hero-background"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />
      </div>
      
      <div className="hero-content">
        <h1 className="hero-text mb-6 animate-fade-in">
          Traditional Recipes,
          <br />
          Modern Kitchen
        </h1>

        <p 
          className="hero-subtext animate-fade-in" 
          style={{ animationDelay: "0.1s" }}
        >
          Discover authentic family recipes passed down through generations. 
          From comfort classics to cultural treasures.
        </p>
        
        <div 
          className="hero-actions animate-fade-in" 
          style={{ animationDelay: "0.2s" }}
        >
          <div className="hero-search">
            <Search className="hero-search-icon" />
            <input
              type="text"
              placeholder="Search recipes..."
              className="hero-search-input"
            />
          </div>

          <button 
            onClick={onGetStarted}
            className="hero-cta-button"
          >
            Get Started
            <ArrowRight className="hero-cta-arrow" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  onGetStarted: PropTypes.func,
};

export default Hero;
