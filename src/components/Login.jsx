import React from 'react';
import { supabase } from '../lib/supabase';

const Login = ({ onAuthStateChange }) => {
  const handleEmailLogin = async () => {
    // For demo - you can use magic link or email/password
    const { data, error } = await supabase.auth.signInWithOtp({
      email: 'demo@prashikshan.com',
      options: {
        shouldCreateUser: true, // Creates user if doesn't exist
      }
    });
    
    if (!error) {
      console.log('Magic link sent!');
    }
  };

  const handleMockLogin = async () => {
    // For quick testing - creates a user
    const { data, error } = await supabase.auth.signUp({
      email: `user${Date.now()}@prashikshan.com`,
      password: 'demo123',
    });
    
    if (data.user) {
      onAuthStateChange(data.user);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Prashikshan</h2>
      <button onClick={handleMockLogin} className="login-button">
        Quick Login (Demo)
      </button>
      <button onClick={handleEmailLogin} style={{marginTop: '10px'}}>
        Send Magic Link
      </button>
    </div>
  );
};

export default Login;
