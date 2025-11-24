import PropTypes from "prop-types";
import { ChefHat, Heart, Sparkles, ArrowRight } from "lucide-react";
import "../assets/styles/welcome.css";

export default function Welcome({ onGetStarted }) {
  return (
    <div className="welcome-container">
      {/* Animated background elements */}
      <div className="floating-food food-1">🍲</div>
      <div className="floating-food food-2">🥘</div>
      <div className="floating-food food-3">🍗</div>
      <div className="floating-food food-4">🍚</div>

      <div className="welcome-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1 className="hero-logo animate-fade-in">
              🍽️ LocalBite
            </h1>
            <h2 className="hero-tagline animate-slide-up">
              Discover Authentic Cameroonian Recipes
            </h2>
            <p className="hero-description animate-slide-up-delay">
              Your gateway to traditional Cameroonian cuisine. Explore, share, and save 
              your favorite recipes from across all ten regions of Cameroon.
            </p>
            
            <button onClick={onGetStarted} className="cta-button animate-bounce">
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>

            {/* Stats */}
            <div className="stats-container animate-fade-in-delay">
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Recipes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10</span>
                <span className="stat-label">Regions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>

          <div className="hero-image animate-scale-in">
            <div className="image-backdrop"></div>
            <div className="image-border-gradient"></div>
            <div className="image-wrapper">
              <div className="image-glow"></div>
              <img 
                src="https://res.cloudinary.com/drs0ewxd1/image/upload/v1/cameroon-recipes/lunch/ndole.jpeg" 
                alt="Delicious Cameroonian Kati Kati"
                className="featured-dish"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="image-badge">
              <span className="badge-icon">⭐</span>
              <span className="badge-text">National Dish</span>
            </div>
            <div className="floating-accent accent-1">✨</div>
            <div className="floating-accent accent-2">🌟</div>
            <div className="floating-accent accent-3">💫</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="feature-card animate-slide-up">
            <div className="feature-icon-wrapper orange">
              <ChefHat size={32} />
            </div>
            <h3 className="feature-title">Browse Recipes</h3>
            <p className="feature-text">
              Explore hundreds of authentic Cameroonian dishes from breakfast to dessert
            </p>
          </div>

          <div className="feature-card animate-slide-up-delay">
            <div className="feature-icon-wrapper red">
              <Heart size={32} />
            </div>
            <h3 className="feature-title">Save Favorites</h3>
            <p className="feature-text">
              Keep track of your favorite recipes and access them anytime
            </p>
          </div>

          <div className="feature-card animate-slide-up-delay-2">
            <div className="feature-icon-wrapper purple">
              <Sparkles size={32} />
            </div>
            <h3 className="feature-title">Share Your Own</h3>
            <p className="feature-text">
              Contribute your family recipes and share them with the community
            </p>
          </div>
        </div>

        {/* Popular Dishes Preview */}
        <div className="preview-section animate-fade-in">
          <h3 className="preview-title">Popular Dishes to Discover</h3>
          <div className="dish-grid">
            <div className="dish-badge">🥘 Ndolé</div>
            <div className="dish-badge">🍗 Kati Kati</div>
            <div className="dish-badge">🍚 Jollof Rice</div>
            <div className="dish-badge">🥣 Eru</div>
            <div className="dish-badge">🍖 Suya</div>
            <div className="dish-badge">🥟 Puff Puff</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Welcome.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
};
