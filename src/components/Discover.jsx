import React from 'react';

const Discover = ({ user, onLogout }) => {
  return (
    <div className="discover-container">
      <header>
        <h2>Welcome, {user?.displayName || 'User'}!</h2>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>
      <main>
        <h3>Discover Page</h3>
        <p>Your learning content goes here...</p>
      </main>
    </div>
  );
};

export default Discover;
