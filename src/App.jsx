import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import LoginRegister from './pages/LoginRegister';
import CustomizeYourself from './pages/CustomizeYourself';
import CustomizeCloset from './pages/CustomizeCloset';
import MyCloset from './pages/MyCloset';
import ChooseEvent from './pages/ChooseEvent';
import AIOutfits from './pages/AIOutfits';
import AboutUs from './pages/AboutUs';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('homepage');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userCloset, setUserCloset] = useState({
    men: { topwear: [], bottomwear: [], traditional: [] },
    women: { topwear: [], bottomwear: [], sarees: [], traditional: [] },
    kids: { topwear: [], bottomwear: [], traditional: [] },
    footwear: [],
    accessories: [],
    bags: []
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Check if user can proceed to next step
  const canCustomizeCloset = () => {
    return userProfile && userProfile.bodyType && userProfile.hairType && userProfile.skinTone;
  };

  const canChooseEvent = () => {
    const totalItems = Object.values(userCloset.men).flat().length + 
                      Object.values(userCloset.women).flat().length + 
                      Object.values(userCloset.kids).flat().length + 
                      userCloset.footwear.length + 
                      userCloset.accessories.length + 
                      userCloset.bags.length;
    return totalItems > 0;
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('homepage');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentPage('homepage');
  };

  const handleProfileComplete = (profileData) => {
    setUserProfile(profileData);
    setCurrentPage('homepage');
  };

  const addToCloset = (category, gender, type, item) => {
    setUserCloset(prev => {
      const newCloset = { ...prev };
      if (category === 'clothes') {
        newCloset[gender][type] = [...newCloset[gender][type], item];
      } else {
        newCloset[category] = [...newCloset[category], item];
      }
      return newCloset;
    });
  };

  const handleEventSelect = (eventData) => {
    setSelectedEvent(eventData);
    setCurrentPage('ai-outfits');
  };

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'homepage':
        return (
          <Homepage 
            user={user}
            canCustomizeCloset={canCustomizeCloset()}
            canChooseEvent={canChooseEvent()}
            onNavigate={setCurrentPage}
          />
        );
      case 'login-register':
        return (
          <LoginRegister 
            onLogin={handleLogin}
            onRegister={handleRegister}
            onBackToHome={() => setCurrentPage('homepage')}
          />
        );
      case 'customize-yourself':
        return (
          <CustomizeYourself 
            userProfile={userProfile}
            onComplete={handleProfileComplete}
            onBack={() => setCurrentPage('homepage')}
          />
        );
      case 'customize-closet':
        return (
          <CustomizeCloset 
            userCloset={userCloset}
            addToCloset={addToCloset}
            onSave={() => setCurrentPage('homepage')}
            onBack={() => setCurrentPage('homepage')}
          />
        );
      case 'my-closet':
        return (
          <MyCloset 
            userCloset={userCloset}
            onBack={() => setCurrentPage('homepage')}
          />
        );
      case 'choose-event':
        return (
          <ChooseEvent 
            onEventSelect={handleEventSelect}
            onBack={() => setCurrentPage('homepage')}
          />
        );
      case 'ai-outfits':
        return (
          <AIOutfits 
            userProfile={userProfile}
            userCloset={userCloset}
            selectedEvent={selectedEvent}
            onBack={() => setCurrentPage('homepage')}
          />
        );
      case 'about-us':
        return (
          <AboutUs 
            onBack={() => setCurrentPage('homepage')}
          />
        );
      default:
        return (
          <Homepage 
            user={user}
            canCustomizeCloset={canCustomizeCloset()}
            canChooseEvent={canChooseEvent()}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header 
        user={user}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={() => {
          setUser(null);
          setUserProfile(null);
          setCurrentPage('homepage');
        }}
      />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;