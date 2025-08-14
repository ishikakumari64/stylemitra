import React, { useState } from 'react';
import './Closet.css';

function Closet({ userCloset, addToCloset, onProceedToEvent }) {
  const [dragActive, setDragActive] = useState('');

  const handleFileUpload = (category, files) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem = {
            id: Date.now() + Math.random(),
            image: e.target.result,
            name: file.name,
            category: category,
            uploadDate: new Date().toLocaleDateString()
          };
          addToCloset(category, newItem);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    setDragActive('');
    const files = e.dataTransfer.files;
    handleFileUpload(category, files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (category) => {
    setDragActive(category);
  };

  const handleDragLeave = () => {
    setDragActive('');
  };

  const getTotalItems = () => {
    return userCloset.clothes.length + userCloset.bags.length + userCloset.footwear.length;
  };

  const canProceed = () => {
    return userCloset.clothes.length > 0 && userCloset.bags.length > 0 && userCloset.footwear.length > 0;
  };

  const renderUploadSection = (category, icon, title, description) => {
    const items = userCloset[category];
    const isActive = dragActive === category;

    return (
      <div className="upload-section">
        <h3 className="section-title">
          <span className="section-icon">{icon}</span>
          {title}
          <span className="item-count">({items.length} items)</span>
        </h3>
        
        <div 
          className={`upload-area ${isActive ? 'drag-active' : ''}`}
          onDrop={(e) => handleDrop(e, category)}
          onDragOver={handleDragOver}
          onDragEnter={() => handleDragEnter(category)}
          onDragLeave={handleDragLeave}
        >
          <div className="upload-content">
            <div className="upload-icon">{icon}</div>
            <h4>Upload {title}</h4>
            <p>{description}</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(category, e.target.files)}
              className="file-input"
              id={`${category}-upload`}
            />
            <label htmlFor={`${category}-upload`} className="upload-btn">
              Choose Files or Drag & Drop
            </label>
          </div>
        </div>

        {items.length > 0 && (
          <div className="uploaded-items">
            <h4>Uploaded {title}</h4>
            <div className="items-grid">
              {items.map(item => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <p className="item-name">{item.name.substring(0, 15)}...</p>
                    <p className="item-date">{item.uploadDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="closet-container">
      <div className="closet-header">
        <div className="progress-indicator">
          <div className="step completed">1</div>
          <div className="step active">2</div>
          <div className="step">3</div>
          <div className="step">4</div>
        </div>
        
        <h1>Upload Your Wardrobe</h1>
        <p>Add photos of your clothes, bags, and footwear so our AI can create perfect combinations for you!</p>
        
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{getTotalItems()}</span>
            <span className="stat-label">Total Items</span>
          </div>
          <div className="stat">
            <span className="stat-number">{userCloset.clothes.length}</span>
            <span className="stat-label">Clothes</span>
          </div>
          <div className="stat">
            <span className="stat-number">{userCloset.bags.length}</span>
            <span className="stat-label">Bags</span>
          </div>
          <div className="stat">
            <span className="stat-number">{userCloset.footwear.length}</span>
            <span className="stat-label">Footwear</span>
          </div>
        </div>
      </div>

      <div className="upload-sections">
        {renderUploadSection(
          'clothes', 
          '👔', 
          'Clothes', 
          'Upload shirts, dresses, tops, pants, kurtas, sarees, etc.'
        )}
        
        {renderUploadSection(
          'bags', 
          '👜', 
          'Bags & Accessories', 
          'Upload handbags, clutches, backpacks, jewelry, etc.'
        )}
        
        {renderUploadSection(
          'footwear', 
          '👠', 
          'Footwear', 
          'Upload shoes, heels, sneakers, sandals, boots, etc.'
        )}
      </div>

      <div className="proceed-section">
        {canProceed() ? (
          <div className="ready-message">
            <h3>🎉 Great! Your wardrobe is ready</h3>
            <p>You've uploaded items in all categories. Now let's choose an event to get AI suggestions!</p>
            <button 
              className="proceed-btn"
              onClick={onProceedToEvent}
            >
              Continue to Event Selection →
            </button>
          </div>
        ) : (
          <div className="waiting-message">
            <h3>📋 Upload Required</h3>
            <p>Please add at least one item in each category (Clothes, Bags, Footwear) to continue.</p>
            <div className="requirements">
              <div className={`requirement ${userCloset.clothes.length > 0 ? 'completed' : ''}`}>
                ✓ At least 1 clothing item
              </div>
              <div className={`requirement ${userCloset.bags.length > 0 ? 'completed' : ''}`}>
                ✓ At least 1 bag/accessory
              </div>
              <div className={`requirement ${userCloset.footwear.length > 0 ? 'completed' : ''}`}>
                ✓ At least 1 footwear item
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Closet;