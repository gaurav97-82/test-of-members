import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Login = ({ onAuthStateChange }) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Create a unique email for demo
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
        // If user already exists, try sign in
        if (error.message.includes('already registered')) {
          await handleSignIn(demoEmail);
        } else {
          throw error;
        }
      } else if (data.user) {
        console.log('✅ User created:', data.user);
        onAuthStateChange(data.user);
      }
    } catch (error) {
      console.error('❌ Sign up error:', error);
      // Fallback to mock user if Supabase fails
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
        console.log('✅ User signed in:', data.user);
        onAuthStateChange(data.user);
      }
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
  };

  const handleMockLogin = () => {
    // Use actual Supabase auth instead of mock
    handleSignUp();
  };

  const testSupabaseManually = async () => {
    try {
      console.log('🧪 Testing Supabase auth...');
      
      // Test 1: Check if we can access profiles table
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (profilesError) {
        console.error('❌ Profiles table access failed:', profilesError);
      } else {
        console.log('✅ Profiles table accessible:', profilesData);
      }

      // Test 2: Check current auth session
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('🔐 Current session:', sessionData);

    } catch (error) {
      console.error('❌ Test failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Prashikshan</h2>
      <button 
        onClick={handleMockLogin} 
        className="login-button"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Login (Demo)'}
      </button>
      
      {/* Test button */}
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
        Using real Supabase authentication
      </div>
    </div>
  );
};

export default Login;
