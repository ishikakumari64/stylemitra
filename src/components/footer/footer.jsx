import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>StyleMitra</h3>
          <p>Your AI-powered styling assistant</p>
        </div>
        
        <div className="footer-center">
          <p>&copy; 2024 StyleMitra. All rights reserved.</p>
        </div>
        
        <div className="footer-right">
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">🐦</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;