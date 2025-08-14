import React, { useState, useEffect } from 'react';
import './AISuggestions.css';

function AISuggestions({ userProfile, userCloset, selectedEvent, onStartOver }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  // Simulate AI processing
  useEffect(() => {
    generateAISuggestions();
  }, []);

  const generateAISuggestions = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const combinations = createOutfitCombinations();
      setSuggestions(combinations);
      setLoading(false);
    }, 3000);
  };

  const createOutfitCombinations = () => {
    const combinations = [];
    const { clothes, bags, footwear } = userCloset;

    // Create 3-4 different combinations
    for (let i = 0; i < Math.min(4, clothes.length); i++) {
      const clothingItem = clothes[i] || clothes[0];
      const bagItem = bags[i % bags.length];
      const footwearItem = footwear[i % footwear.length];

      combinations.push({
        id: i + 1,
        title: `Outfit ${i + 1}`,
        aiRating: Math.floor(Math.random() * 20) + 80, // 80-100 rating
        items: {
          clothing: clothingItem,
          bag: bagItem,
          footwear: footwearItem
        },
        aiReason: getAIReason(selectedEvent, userProfile),
        tags: getOutfitTags(selectedEvent, i),
        colorHarmony: Math.floor(Math.random() * 15) + 85
      });
    }

    return combinations.sort((a, b) => b.aiRating - a.aiRating);
  };

  const getAIReason = (event, profile) => {
    const reasons = {
      wedding: [
        `Perfect traditional elegance for ${profile.skinTone} skin tone`,
        `Complements your ${profile.bodyType} body type beautifully`,
        `Classic wedding attire with modern touch`,
        `Color coordination enhances your natural features`
      ],
      party: [
        `Trendy and stylish for party vibes`,
        `Perfect balance of comfort and style`,
        `Eye-catching combination for social events`,
        `Modern look that suits your personality`
      ],
      office: [
        `Professional yet stylish for workplace`,
        `Confident and sophisticated appearance`,
        `Perfect business attire combination`,
        `Comfortable for all-day wear`
      ],
      casual: [
        `Effortlessly chic for casual outings`,
        `Comfortable and trendy combination`,
        `Perfect for relaxed social settings`,
        `Easy-going yet put-together look`
      ]
    };

    const eventReasons = reasons[event.event] || reasons.casual;
    return eventReasons[Math.floor(Math.random() * eventReasons.length)];
  };

  const getOutfitTags = (event, index) => {
    const allTags = {
      wedding: ['Traditional', 'Elegant', 'Festive', 'Graceful'],
      party: ['Trendy', 'Chic', 'Fun', 'Stylish'],
      office: ['Professional', 'Smart', 'Confident', 'Polished'],
      casual: ['Comfortable', 'Relaxed', 'Easy-going', 'Versatile']
    };

    const eventTags = allTags[event.event] || allTags.casual;
    return [eventTags[index % eventTags.length], 'AI Approved', 'Perfect Match'];
  };

  const handleOutfitSelect = (outfit) => {
    setSelectedOutfit(outfit);
  };

  const renderLoadingScreen = () => (
    <div className="loading-screen">
      <div className="ai-processing">
        <div className="ai-brain">🧠</div>
        <h2>AI is creating perfect combinations...</h2>
        <div className="processing-steps">
          <div className="step">✓ Analyzing your body type and skin tone</div>
          <div className="step">✓ Matching colors and styles</div>
          <div className="step">✓ Considering event requirements</div>
          <div className="step active">✓ Generating outfit combinations</div>
        </div>
        <div className="loader">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return renderLoadingScreen();
  }

  return (
    <div className="suggestions-container">
      <div className="suggestions-header">
        <div className="progress-indicator">
          <div className="step completed">1</div>
          <div className="step completed">2</div>
          <div className="step completed">3</div>
          <div className="step active">4</div>
        </div>
        
        <h1>🎉 Your AI-Generated Outfit Suggestions</h1>
        <div className="event-info">
          <p><strong>Event:</strong> {selectedEvent.eventName}</p>
          <p><strong>Style:</strong> {selectedEvent.styleName}</p>
        </div>
        
        <div className="ai-stats">
          <div className="stat">
            <span className="stat-number">{suggestions.length}</span>
            <span className="stat-label">Combinations Created</span>
          </div>
          <div className="stat">
            <span className="stat-number">{userCloset.clothes.length + userCloset.bags.length + userCloset.footwear.length}</span>
            <span className="stat-label">Items Analyzed</span>
          </div>
          <div className="stat">
            <span className="stat-number">AI</span>
            <span className="stat-label">Powered</span>
          </div>
        </div>
      </div>

      <div className="suggestions-grid">
        {suggestions.map(suggestion => (
          <div
            key={suggestion.id}
            className={`suggestion-card ${selectedOutfit?.id === suggestion.id ? 'selected' : ''}`}
            onClick={() => handleOutfitSelect(suggestion)}
          >
            <div className="card-header">
              <h3>{suggestion.title}</h3>
              <div className="ai-rating">
                <span className="rating-score">{suggestion.aiRating}%</span>
                <span className="rating-label">AI Match</span>
              </div>
            </div>

            <div className="outfit-combination">
              <div className="outfit-item">
                <img src={suggestion.items.clothing.image} alt="Clothing" className="item-image" />
                <span className="item-label">👔 Clothing</span>
              </div>
              <div className="plus-icon">+</div>
              <div className="outfit-item">
                <img src={suggestion.items.bag.image} alt="Bag" className="item-image" />
                <span className="item-label">👜 Bag</span>
              </div>
              <div className="plus-icon">+</div>
              <div className="outfit-item">
                <img src={suggestion.items.footwear.image} alt="Footwear" className="item-image" />
                <span className="item-label">👠 Footwear</span>
              </div>
            </div>

            <div className="ai-analysis">
              <p className="ai-reason">💡 {suggestion.aiReason}</p>
              <div className="color-harmony">
                <span>🎨 Color Harmony: {suggestion.colorHarmony}%</span>
              </div>
            </div>

            <div className="outfit-tags">
              {suggestion.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <button className="select-outfit-btn">
              {selectedOutfit?.id === suggestion.id ? '✓ Selected' : 'Select This Outfit'}
            </button>
          </div>
        ))}
      </div>

      {selectedOutfit && (
        <div className="selected-outfit-details">
          <h2>🎯 Your Selected Outfit</h2>
          <div className="outfit-preview">
            <div className="preview-items">
              <img src={selectedOutfit.items.clothing.image} alt="Selected Clothing" />
              <img src={selectedOutfit.items.bag.image} alt="Selected Bag" />
              <img src={selectedOutfit.items.footwear.image} alt="Selected Footwear" />
            </div>
            <div className="preview-info">
              <h3>{selectedOutfit.title} - {selectedOutfit.aiRating}% AI Match</h3>
              <p>{selectedOutfit.aiReason}</p>
              <div className="action-buttons">
                <button className="save-btn">💾 Save to Favorites</button>
                <button className="share-btn">📤 Share Outfit</button>
                <button className="try-again-btn" onClick={onStartOver}>🔄 Try Different Event</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedOutfit && (
        <div className="help-section">
          <h3>🤖 How Our AI Works</h3>
          <div className="ai-features">
            <div className="feature">
              <span className="feature-icon">🎨</span>
              <h4>Color Analysis</h4>
              <p>Matches colors based on your skin tone and event requirements</p>
            </div>
            <div className="feature">
              <span className="feature-icon">👗</span>
              <h4>Style Matching</h4>
              <p>Considers your body type and personal style preferences</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <h4>Trend Analysis</h4>
              <p>Incorporates current fashion trends and seasonal styles</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <h4>Event Appropriateness</h4>
              <p>Ensures outfit is perfect for your chosen occasion</p>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-actions">
        <button className="regenerate-btn" onClick={generateAISuggestions}>
          🔄 Generate New Combinations
        </button>
        <button className="start-over-btn" onClick={onStartOver}>
          🏠 Start Over
        </button>
      </div>
    </div>
  );
}

export default AISuggestions;