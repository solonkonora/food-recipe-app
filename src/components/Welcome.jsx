import PropTypes from "prop-types";

export default function Welcome({ onGetStarted }) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <h1 style={styles.logo}>
            🍽️ LocalBite
          </h1>
          <h2 style={styles.tagline}>
            Discover Authentic Cameroonian Recipes
          </h2>
          <p style={styles.description}>
            Your gateway to traditional Cameroonian cuisine. Explore, share, and save your favorite recipes from across all ten regions of Cameroon.
          </p>
          
          <button onClick={onGetStarted} style={styles.ctaButton}>
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>📖</span>
            <h3 style={styles.featureTitle}>Browse Recipes</h3>
            <p style={styles.featureText}>
              Explore hundreds of authentic Cameroonian dishes from breakfast to dessert
            </p>
          </div>

          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>❤️</span>
            <h3 style={styles.featureTitle}>Save Favorites</h3>
            <p style={styles.featureText}>
              Keep track of your favorite recipes and access them anytime
            </p>
          </div>

          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>✨</span>
            <h3 style={styles.featureTitle}>Share Your Own</h3>
            <p style={styles.featureText}>
              Contribute your family recipes and share them with the community
            </p>
          </div>
        </div>

        {/* Popular Dishes Preview */}
        <div style={styles.preview}>
          <h3 style={styles.previewTitle}>Popular Dishes</h3>
          <div style={styles.dishList}>
            <span style={styles.dishBadge}>🥘 Ndolé</span>
            <span style={styles.dishBadge}>🍗 Kati Kati</span>
            <span style={styles.dishBadge}>🍚 Jollof Rice</span>
            <span style={styles.dishBadge}>🥣 Eru</span>
            <span style={styles.dishBadge}>🍖 Suya</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Welcome.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  content: {
    maxWidth: "1200px",
    width: "100%",
  },
  hero: {
    textAlign: "center",
    marginBottom: "4rem",
    color: "white",
  },
  logo: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  tagline: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "1rem",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  description: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    maxWidth: "600px",
    margin: "0 auto 2rem",
    lineHeight: "1.6",
    opacity: "0.95",
  },
  ctaButton: {
    padding: "1rem 3rem",
    fontSize: "1.25rem",
    fontWeight: "600",
    backgroundColor: "white",
    color: "#ea580c",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  featureIcon: {
    fontSize: "3rem",
    display: "block",
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "0.5rem",
  },
  featureText: {
    color: "#666",
    lineHeight: "1.5",
  },
  preview: {
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "2rem",
    borderRadius: "12px",
  },
  previewTitle: {
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "white",
    marginBottom: "1.5rem",
  },
  dishList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
  dishBadge: {
    backgroundColor: "white",
    color: "#ea580c",
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    fontSize: "1.1rem",
    fontWeight: "500",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};
