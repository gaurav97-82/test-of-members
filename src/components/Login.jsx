import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Login = ({ onAuthStateChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    
    try {
      const demoEmail = `demo${Date.now()}@prashikshan.com`;
      const demoPassword = 'demopassword123';
      
      console.log('🚀 Starting signup process...');
      console.log('📧 Email:', demoEmail);

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: demoEmail,
        password: demoPassword,
        options: {
          data: {
            display_name: 'Demo User'
          }
        }
      });

      console.log('🔐 Signup response:', { data, error });

      if (error) {
        // If user already exists, try to sign in
        if (error.message.includes('already registered')) {
          console.log('🔄 User exists, trying sign in...');
          await handleSignIn(demoEmail, demoPassword);
        } else {
          throw error;
        }
      } else if (data.user) {
        console.log('✅ User created successfully:', data.user);
        console.log('🔑 Session:', data.session);
        
        // Wait a moment for the session to be set
        setTimeout(() => {
          onAuthStateChange(data.user);
        }, 1000);
      }
    } catch (error) {
      console.error('❌ Sign up error:', error);
      setError(error.message);
      
      // Fallback to mock user
      const mockUser = {
        id: `mock_user_${Date.now()}`,
        email: 'demo@prashikshan.com',
        user_metadata: { display_name: 'Demo User' }
      };
      onAuthStateChange(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      console.log('🔑 Attempting sign in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;
      
      console.log('✅ Sign in successful:', data.user);
      console.log('🎫 Session active:', !!data.session);
      
      if (data.user) {
        onAuthStateChange(data.user);
      }
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
  };

  const checkCurrentSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('🔍 Current session:', session);
      console.log('👤 Current user:', session?.user);
      return session;
    } catch (error) {
      console.error('❌ Session check error:', error);
      return null;
    }
  };

  return (
    <div className="login-container">
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h2>Welcome to Prashikshan</h2>
        <p className="login-subtitle">
          Your personalized learning platform. Start your journey today with a demo account.
        </p>
        
        {error && (
          <div className="error-message" style={{ marginBottom: '1rem' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
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
        
        {/* Debug button */}
        <button 
          onClick={checkCurrentSession}
          className="test-button"
        >
          🔍 Check Current Session
        </button>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '10px',
          fontSize: '0.9rem'
        }}>
          <strong>Open browser console (F12) to see detailed logs</strong>
        </div>
      </div>
    </div>
  );
};

export default Login;
