import React, { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Discover from './components/Discover.jsx';
import SetupProfile from './components/SetupProfile.jsx';
import { supabase } from './lib/supabase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [setupComplete, setSetupComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 Initializing app...');
      
      // Check Supabase connection
      await testSupabaseConnection();
      
      // Check for existing session
      await checkAuthSession();
    };

    initializeApp();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔑 Auth state changed:', event);
        console.log('🎫 Session:', session);
        
        if (session?.user) {
          console.log('✅ User authenticated:', session.user);
          setUser(session.user);
          await checkUserProfile(session.user.id);
        } else {
          console.log('❌ No user session');
          setUser(null);
          setSetupComplete(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1);
      setSupabaseConnected(!error);
      
      if (error) {
        console.error('❌ Supabase connection failed:', error);
      } else {
        console.log('✅ Supabase connected successfully');
      }
    } catch (error) {
      console.error('❌ Supabase test failed:', error);
      setSupabaseConnected(false);
    }
  };

  const checkAuthSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('🔍 Current auth session:', session);
      
      if (session?.user) {
        console.log('✅ Existing session found:', session.user);
        setUser(session.user);
        await checkUserProfile(session.user.id);
      } else {
        console.log('ℹ️ No existing session');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserProfile = async (userId) => {
    try {
      console.log('🔍 Checking user profile for:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('📊 Profile check result:', { data, error });
      
      if (data && !error) {
        console.log('✅ Profile exists');
        setSetupComplete(true);
      } else {
        console.log('ℹ️ No profile found or error:', error);
        setSetupComplete(false);
      }
    } catch (error) {
      console.error('❌ Profile check error:', error);
      setSetupComplete(false);
    }
  };

  const handleAuthStateChange = async (userData) => {
    console.log('👤 Auth state changed to:', userData);
    
    // Check if this is a real Supabase user or mock user
    if (userData.id && !userData.id.startsWith('mock_')) {
      // Real Supabase user - verify session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log('✅ Valid Supabase session confirmed');
        setUser(session.user);
      } else {
        console.log('❌ No Supabase session for real user');
        setUser(userData); // Use the user data anyway
      }
    } else {
      // Mock user
      console.log('👥 Using mock user');
      setUser(userData);
    }
    
    setSetupComplete(false);
  };

  const handleSetupComplete = (profileData) => {
    console.log('✅ Profile setup completed');
    setSetupComplete(true);
  };

  const handleLogout = async () => {
    console.log('🚪 Logging out...');
    await supabase.auth.signOut();
    setUser(null);
    setSetupComplete(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your learning platform...</p>
        {!supabaseConnected && (
          <div style={{ 
            background: 'rgba(255, 107, 107, 0.1)', 
            color: '#ff6b6b', 
            padding: '10px', 
            borderRadius: '8px',
            marginTop: '20px',
            maxWidth: '300px'
          }}>
            <strong>⚠️ Supabase Connection Issue</strong>
            <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>
              Some features may not work properly.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      {!user ? (
        <Login onAuthStateChange={handleAuthStateChange} />
      ) : !setupComplete ? (
        <SetupProfile onComplete={handleSetupComplete} />
      ) : (
        <Discover user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
