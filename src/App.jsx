import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Prashikshan
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Learning Platform - Coming Soon
        </p>
        <div style={{ marginTop: '2rem' }}>
          <button style={{
            padding: '12px 24px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
