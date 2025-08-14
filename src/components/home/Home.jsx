import React from 'react';
import './Home.css';

function Home({ onLogin, onGoToRegister }) {
  return (
    <div className="home-container">
      {/* Navigation Header */}
      <header className="home-header">
        <div className="logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">StyleMitra</span>
        </div>
        <nav className="nav-links">
          <a href="#about">About Us</a>
          <a href="#features">My Closet</a>
          <button className="login-btn" onClick={onLogin}>
            Login
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            Style Your <span className="highlight">Perfect Look</span>
          </h1>
          <p className="subtitle">
            Your AI-powered fashion companion that creates perfect outfits from your closet
          </p>
          
          {/* Feature Icons */}
          <div className="feature-icons">
            <div className="feature-icon">
              <span className="icon">👔</span>
              <span className="label">AI</span>
            </div>
            <div className="feature-icon">
              <span className="icon">👗</span>
              <span className="label">Style</span>
            </div>
            <div className="feature-icon">
              <span className="icon">✨</span>
              <span className="label">Perfect</span>
            </div>
          </div>
          
          <button className="cta-button" onClick={onGoToRegister}>
            Customize Yourself
          </button>
        </div>
        
        {/* Background Decoration */}
        <div className="background-decoration">
          <div className="floating-element elem-1">👗</div>
          <div className="floating-element elem-2">👔</div>
          <div className="floating-element elem-3">👠</div>
          <div className="floating-element elem-4">👜</div>
          <div className="floating-element elem-5">💄</div>
          <div className="floating-element elem-6">👑</div>
        </div>
      </main>
      
      {/* Bottom Indicator */}
      <div className="scroll-indicator">
        <div className="indicator-dot"></div>
      </div>
    </div>
  );
}

export default Home;