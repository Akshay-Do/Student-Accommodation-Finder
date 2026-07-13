import React from "react";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-wrapper">
        
        {/* Left Side: Brand & Copyright Details */}
        <div className="footer-left">
          <h2 className="footer-logo">NestQuest</h2>
          <p className="footer-text">
            © 2024 NestQuest Housing. Reliable. Protective. <br />
            Optimistic. Helping Kenyan students live <br />
            securely.
          </p>
        </div>

        {/* Right Side: Horizontal Navigation Links */}
        <div className="footer-right">
          <nav className="footer-nav">
            <a href="#about" className="footer-link">About Us</a>
            <a href="#safety" className="footer-link">Safety Guide</a>
            <a href="#terms" className="footer-link">Landlord Terms</a>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
          </nav>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
