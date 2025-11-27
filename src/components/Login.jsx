import React from 'react';

const Login = ({ onAuthStateChange }) => {
  const handleMockLogin = () => {
    const mockUser = {
      uid: `user_${Date.now()}`,
      email: 'demo@example.com',
      displayName: 'Demo User'
    };
    onAuthStateChange(mockUser);
  };

  return (
    <div className="login-container">
      <h2>Welcome to Prashikshan</h2>
      <button onClick={handleMockLogin} className="login-button">
        Login (Demo)
      </button>
    </div>
  );
};

export default Login;
