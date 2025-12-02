import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipesByCategory from "./RecipesByCategory";
import Footer from "./footer";
import { ArrowLeft } from "lucide-react";

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/')} 
            className="back-button"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ea580c',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(234, 88, 12, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>
            LocalBite
          </h2>
        </div>
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
