import React, { useState, useEffect } from 'react';
import Login from '../components/Login.jsx';
import Discover from '../components/Discover.jsx';
import SetupProfile from '../components/SetupProfile.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [setupComplete, setSetupComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (using localStorage)
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('currentUser');
      const userUid = localStorage.getItem('userUid');
      
      if (savedUser && userUid) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        
        // Check if user has completed setup
        const hasCompletedSetup = localStorage.getItem(`setupComplete_${userUid}`);
        setSetupComplete(!!hasCompletedSetup);
      } else {
        setUser(null);
        setSetupComplete(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Mock authentication handler
  const handleAuthStateChange = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('userUid', userData.uid || `user_${Date.now()}`);
      
      // Check setup status for this user
      const userUid = userData.uid || `user_${Date.now()}`;
      const hasCompletedSetup = localStorage.getItem(`setupComplete_${userUid}`);
      setSetupComplete(!!hasCompletedSetup);
    } else {
      setUser(null);
      setSetupComplete(false);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userUid');
    }
    setLoading(false);
  };

  const handleSetupComplete = (profileData) => {
    console.log('Profile setup completed:', profileData);
    
    // Mark setup as complete
    const userUid = user?.uid || localStorage.getItem('userUid');
    if (userUid) {
      localStorage.setItem(`setupComplete_${userUid}`, 'true');
      localStorage.setItem(`profile_${userUid}`, JSON.stringify(profileData));
    }
    setSetupComplete(true);
  };

  const handleLogout = () => {
    setUser(null);
    setSetupComplete(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userUid');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {!user ? (
        <Login onAuthStateChange={handleAuthStateChange} />
      ) : !setupComplete ? (
        <SetupProfile onComplete={handleSetupComplete} />
      ) : (
        <Discover user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
