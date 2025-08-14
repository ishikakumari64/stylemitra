import React from 'react';
import './Homepage.css';

function Homepage({ user, canCustomizeCloset, canChooseEvent, onNavigate }) {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            Style Your <span className="highlight">Perfect Look</span>
          </h1>
          <p className="subtitle">
            Your AI-powered fashion companion that creates perfect outfits from your closet
          </p>

          {/* Transparent Closet Design */}
          <div className="transparent-closet">
            <div className="closet-frame">
              <div className="closet-door left-door">
                <div className="door-handle"></div>
                <div className="hanging-clothes">
                  <div className="cloth-item">👔</div>
                  <div className="cloth-item">👗</div>
                  <div className="cloth-item">👚</div>
                </div>
              </div>
              <div className="closet-door right-door">
                <div className="door-handle"></div>
                <div className="hanging-clothes">
                  <div className="cloth-item">👖</div>
                  <div className="cloth-item">👕</div>
                  <div className="cloth-item">🥻</div>
                </div>
              </div>
              <div className="closet-shelves">
                <div className="shelf">
                  <span className="shelf-item">👠</span>
                  <span className="shelf-item">👜</span>
                </div>
                <div className="shelf">
                  <span className="shelf-item">👟</span>
                  <span className="shelf-item">🎒</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {!user ? (
              <button 
                className="primary-btn"
                onClick={() => onNavigate('login-register')}
              >
                Get Started
              </button>
            ) : (
              <>
                <button 
                  className="primary-btn"
                  onClick={() => onNavigate('customize-yourself')}
                >
                  Customize Yourself
                </button>
                
                {canCustomizeCloset && (
                  <button 
                    className="secondary-btn"
                    onClick={() => onNavigate('customize-closet')}
                  >
                    Customize Your Closet
                  </button>
                )}
                
                {canChooseEvent && (
                  <button 
                    className="event-btn"
                    onClick={() => onNavigate('choose-event')}
                  >
                    Choose Your Event
                  </button>
                )}
              </>
            )}
          </div>

          {/* Features */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Styling</h3>
              <p>Get personalized outfit recommendations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👗</div>
              <h3>Smart Closet</h3>
              <p>Organize your wardrobe digitally</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Event Ready</h3>
              <p>Perfect outfits for every occasion</p>
            </div>
          </div>
        </div>

        {/* Background Animation */}
        <div className="background-animation">
          <div className="floating-item item-1">👔</div>
          <div className="floating-item item-2">👗</div>
          <div className="floating-item item-3">👠</div>
          <div className="floating-item item-4">👜</div>
          <div className="floating-item item-5">💄</div>
          <div className="floating-item item-6">👑</div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;