import React from 'react';
import './Header.css';

function Header({ user, currentPage, onNavigate, onLogout }) {
  return (
    <header className="transparent-header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo" onClick={() => onNavigate('homepage')}>
          <span className="logo-icon">✨</span>
          <span className="logo-text">StyleMitra</span>
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          {!user ? (
            <button 
              className="nav-btn"
              onClick={() => onNavigate('login-register')}
            >
              Register/Login
            </button>
          ) : (
            <>
              <button 
                className={`nav-btn ${currentPage === 'about-us' ? 'active' : ''}`}
                onClick={() => onNavigate('about-us')}
              >
                About Us
              </button>
              <button 
                className={`nav-btn ${currentPage === 'my-closet' ? 'active' : ''}`}
                onClick={() => onNavigate('my-closet')}
              >
                My Closet
              </button>
              <div className="user-profile">
                <span className="user-name">{user.name}</span>
                <button className="logout-btn" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
          
          {user && (
            <button 
              className="nav-btn profile-btn"
              onClick={() => onNavigate('customize-yourself')}
            >
              Your Profile
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;