import React from 'react';
import { supabase } from '../lib/supabase';

const Login = ({ onAuthStateChange }) => {
  const handleMockLogin = () => {
    const mockUser = {
      uid: `user_${Date.now()}`,
      email: 'demo@example.com',
      displayName: 'Demo User'
    };
    onAuthStateChange(mockUser);
  };

  const testSupabaseManually = async () => {
    try {
      console.log('🧪 Manual Supabase test...');
      const { data, error } = await supabase.from('profiles').select('*').limit(1);
      
      if (error) {
        alert(`❌ Supabase FAILED: ${error.message}`);
        console.error('Full error:', error);
      } else {
        alert('✅ Supabase WORKING! Check console for details.');
        console.log('Supabase data:', data);
      }
    } catch (error) {
      alert(`❌ Test ERROR: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Prashikshan</h2>
      <button onClick={handleMockLogin} className="login-button">
        Login (Demo)
      </button>
      
      {/* Test button - remove after debugging */}
      <button 
        onClick={testSupabaseManually}
        style={{
          marginTop: '20px',
          background: '#666',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🧪 Test Supabase Connection
      </button>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Open browser console (F12) to see detailed connection logs
      </div>
    </div>
  );
};

export default Login;
