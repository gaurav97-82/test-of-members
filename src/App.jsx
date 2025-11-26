import React, { useState, useEffect } from 'react';

import Login from './components/Login';
import Discover from './components/Discover';
import SetupProfile from './components/SetupProfile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [setupComplete, setSetupComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        // Check if user has completed setup
        const hasCompletedSetup = localStorage.getItem(`setupComplete_${user.uid}`);
        setSetupComplete(!!hasCompletedSetup);
      } else {
        setSetupComplete(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSetupComplete = (profileData) => {
    // Save profile data (you can save to Firestore later)
    console.log('Profile setup completed:', profileData);
    
    // Mark setup as complete
    localStorage.setItem(`setupComplete_${user.uid}`, 'true');
    setSetupComplete(true);
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
        <Login />
      ) : !setupComplete ? (
        <SetupProfile onComplete={handleSetupComplete} />
      ) : (
        <Discover user={user} />
      )}
    </div>
  );
}

export default App;
