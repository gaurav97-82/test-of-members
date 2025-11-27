import React, { useState } from 'react';
import Login from './components/Login.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleAuthStateChange = (userData) => {
    setUser(userData);
  };

  if (!user) {
    return <Login onAuthStateChange={handleAuthStateChange} />;
  }

  return (
    <div className="App">
      <h1>Welcome to Prashikshan, {user.displayName}!</h1>
      <p>Login successful! Ready to add more features.</p>
    </div>
  );
}

export default App;
