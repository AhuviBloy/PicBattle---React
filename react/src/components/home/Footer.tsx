import { useNavigate } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and mission section */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <h2>PicBattle</h2>
            </div>
            <p className="footer-tagline">Where creativity meets community</p>
            <p className="footer-mission">
              Our mission is to inspire photographers worldwide through creative challenges, 
              meaningful feedback, and a supportive community.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a onClick={() => navigate("/")}>Home</a></li>
              <li><a onClick={() => navigate("/challengeList")}>Challenges</a></li>
              <li><a onClick={() => navigate("/leaderboard")}>Leaderboard</a></li>
              <li><a onClick={() => navigate("/community")}>Community</a></li>
              <li><a onClick={() => navigate("/events")}>Events</a></li>
              <li><a onClick={() => navigate("/blog")}>Blog</a></li>
            </ul>
          </div>
          
          {/* Explore */}
          <div className="footer-section footer-links">
            <h3>Explore</h3>
            <ul>
              <li><a onClick={() => navigate("/categories")}>Categories</a></li>
              <li><a onClick={() => navigate("/popular")}>Popular Submissions</a></li>
              <li><a onClick={() => navigate("/winners")}>Past Winners</a></li>
              <li><a onClick={() => navigate("/premium")}>Premium Membership</a></li>
              <li><a onClick={() => navigate("/workshops")}>Workshops</a></li>
              <li><a onClick={() => navigate("/resources")}>Resources</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="footer-section footer-links">
            <h3>Support</h3>
            <ul>
              <li><a onClick={() => navigate("/help")}>Help Center</a></li>
              <li><a onClick={() => navigate("/guidelines")}>Community Guidelines</a></li>
              <li><a onClick={() => navigate("/faq")}>FAQs</a></li>
              <li><a onClick={() => navigate("/contact")}>Contact Us</a></li>
              <li><a onClick={() => navigate("/feedback")}>Submit Feedback</a></li>
              <li><a onClick={() => navigate("/report")}>Report an Issue</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest challenges, tips, and community highlights.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button className="newsletter-button">Subscribe</button>
            </div>
            <div className="app-download">
              <p>Get our mobile app:</p>
              <div className="app-buttons">
                <a href="#" className="app-button">
                  <i className="fab fa-apple"></i> App Store
                </a>
                <a href="#" className="app-button">
                  <i className="fab fa-google-play"></i> Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <a onClick={() => navigate("/terms")}>Terms of Service</a>
            <a onClick={() => navigate("/privacy")}>Privacy Policy</a>
            <a onClick={() => navigate("/copyright")}>Copyright Policy</a>
            <a onClick={() => navigate("/cookies")}>Cookie Policy</a>
          </div>
          <div className="footer-copyright">
            &copy; {currentYear} PicBattle. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;