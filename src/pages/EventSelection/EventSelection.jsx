import React, { useState } from 'react';
import './EventSelection.css';

function EventSelection({ onEventSelect, userProfile }) {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  const events = [
    {
      id: 'wedding',
      name: 'Wedding/Reception',
      icon: '💒',
      description: 'Traditional or contemporary wedding outfits',
      styles: ['Traditional Indian', 'Indo-Western', 'Western Formal']
    },
    {
      id: 'party',
      name: 'Party/Night Out',
      icon: '🎉',
      description: 'Stylish outfits for parties and social events',
      styles: ['Casual Party', 'Cocktail', 'Club Night', 'House Party']
    },
    {
      id: 'office',
      name: 'Office/Formal',
      icon: '💼',
      description: 'Professional attire for workplace',
      styles: ['Business Formal', 'Business Casual', 'Smart Casual']
    },
    {
      id: 'casual',
      name: 'Casual Outing',
      icon: '☀️',
      description: 'Comfortable outfits for daily activities',
      styles: ['Brunch', 'Shopping', 'Coffee Date', 'Movie']
    },
    {
      id: 'festival',
      name: 'Festival/Religious',
      icon: '🎭',
      description: 'Traditional outfits for festivals and ceremonies',
      styles: ['Diwali/Holi', 'Eid', 'Christmas', 'Regional Festival']
    },
    {
      id: 'date',
      name: 'Date/Romantic',
      icon: '💕',
      description: 'Special outfits for romantic occasions',
      styles: ['Dinner Date', 'Casual Date', 'Anniversary', 'Valentine\'s Day']
    }
  ];

  const handleEventSelect = (eventId) => {
    setSelectedEvent(eventId);
    setSelectedStyle(''); // Reset style when event changes
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
  };

  const handleProceed = () => {
    if (selectedEvent && selectedStyle) {
      onEventSelect({
        event: selectedEvent,
        style: selectedStyle,
        eventName: events.find(e => e.id === selectedEvent)?.name,
        styleName: selectedStyle
      });
    }
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);

  return (
    <div className="event-selection-container">
      <div className="event-header">
        <div className="progress-indicator">
          <div className="step completed">1</div>
          <div className="step completed">2</div>
          <div className="step active">3</div>
          <div className="step">4</div>
        </div>
        
        <h1>Choose Your Event</h1>
        <p>Select the occasion you're dressing up for, and we'll suggest the perfect outfit combination!</p>
        
        <div className="user-summary">
          <h3>Your Style Profile:</h3>
          <div className="profile-tags">
            <span className="tag">👤 {userProfile.bodyType}</span>
            <span className="tag">🎨 {userProfile.skinTone}</span>
            <span className="tag">💇‍♀️ {userProfile.hairType}</span>
          </div>
        </div>
      </div>

      <div className="event-selection">
        <h2>Select Event Type</h2>
        <div className="events-grid">
          {events.map(event => (
            <div
              key={event.id}
              className={`event-card ${selectedEvent === event.id ? 'selected' : ''}`}
              onClick={() => handleEventSelect(event.id)}
            >
              <div className="event-icon">{event.icon}</div>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              {selectedEvent === event.id && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedEventData && (
        <div className="style-selection">
          <h2>Choose Style for {selectedEventData.name}</h2>
          <div className="styles-grid">
            {selectedEventData.styles.map(style => (
              <div
                key={style}
                className={`style-card ${selectedStyle === style ? 'selected' : ''}`}
                onClick={() => handleStyleSelect(style)}
              >
                <h4>{style}</h4>
                {selectedStyle === style && (
                  <div className="selected-indicator">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedEvent && selectedStyle && (
        <div className="proceed-section">
          <div className="selection-summary">
            <h3>🎯 Your Selection:</h3>
            <p><strong>Event:</strong> {selectedEventData.name}</p>
            <p><strong>Style:</strong> {selectedStyle}</p>
          </div>
          
          <button 
            className="generate-btn"
            onClick={handleProceed}
          >
            <span>Generate AI Outfit Suggestions</span>
            <span className="btn-icon">✨</span>
          </button>
        </div>
      )}

      {!selectedEvent && (
        <div className="help-section">
          <h3>💡 Need Help Choosing?</h3>
          <div className="tips">
            <div className="tip">
              <strong>Wedding/Reception:</strong> Perfect for traditional ceremonies and receptions
            </div>
            <div className="tip">
              <strong>Party/Night Out:</strong> Great for birthdays, celebrations, and social gatherings
            </div>
            <div className="tip">
              <strong>Office/Formal:</strong> Professional attire for meetings and workplace
            </div>
            <div className="tip">
              <strong>Casual Outing:</strong> Comfortable yet stylish for everyday activities
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventSelection;