import React, { useState } from 'react';
import Login from './components/Login.jsx';
import SetupProfile from './components/SetupProfile.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [setupComplete, setSetupComplete] = useState(false);

  const handleAuthStateChange = (userData) => {
    setUser(userData);
  };

  const handleSetupComplete = (profileData) => {
    setSetupComplete(true);
    console.log('Profile completed:', profileData);
  };

  if (!user) {
    return <Login onAuthStateChange={handleAuthStateChange} />;
  }

  if (!setupComplete) {
    return <SetupProfile onComplete={handleSetupComplete} />;
  }

  return (
    <div className="App">
      <h1>Welcome to Prashikshan, {user.displayName}!</h1>
      <p>Setup complete! Ready to learn.</p>
    </div>
  );
}

export default App;
