import "../assets/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <h3 className="footer-title">LocalBite Kitchen</h3>
            <p className="footer-text">
              Preserving culinary traditions, one recipe at a time.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="space-y-2 footer-text">
              <li><a href="#recipes" className="footer-link">Recipes</a></li>
              <li><a href="#categories" className="footer-link">Categories</a></li>
              <li><a href="#about" className="footer-link">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Connect</h4>
            <p className="footer-text">
              Join our community of food lovers sharing traditional recipes.
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 LocalBites Kitchen. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
