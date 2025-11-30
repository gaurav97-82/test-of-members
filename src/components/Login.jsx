import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Login = ({ onAuthStateChange }) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const demoEmail = `demo${Date.now()}@prashikshan.com`;
      
      const { data, error } = await supabase.auth.signUp({
        email: demoEmail,
        password: 'demopassword123',
        options: {
          data: {
            display_name: 'Demo User'
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          await handleSignIn(demoEmail);
        } else {
          throw error;
        }
      } else if (data.user) {
        onAuthStateChange(data.user);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      const mockUser = {
        id: `user_${Date.now()}`,
        email: 'demo@prashikshan.com',
        user_metadata: { display_name: 'Demo User' }
      };
      onAuthStateChange(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: 'demopassword123'
      });

      if (error) throw error;
      if (data.user) {
        onAuthStateChange(data.user);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login-container">
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h2>Welcome to Prashikshan</h2>
        <p className="login-subtitle">
          Your personalized learning platform. Start your journey today with a demo account.
        </p>
        
        <button 
          onClick={handleSignUp} 
          className="login-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="loading-spinner" style={{ 
                width: '20px', 
                height: '20px', 
                display: 'inline-block',
                marginRight: '10px'
              }}></div>
              Creating Account...
            </>
          ) : '🚀 Start Learning Now'}
        </button>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '10px',
          fontSize: '0.9rem'
        }}>
          <strong>Demo Features:</strong>
          <ul style={{ textAlign: 'left', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Create your learning profile</li>
            <li>Explore courses</li>
            <li>Track your progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
