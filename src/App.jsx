import React, { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Discover from './components/Discover.jsx';
import SetupProfile from './components/SetupProfile.jsx';
import { supabase } from './lib/supabase';
import './App.css';

// Test function - add this right after imports
const testSupabaseConnection = async () => {
  try {
    console.log('🧪 Testing Supabase connection...');
    console.log('🔗 Supabase URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
    console.log('🔑 Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    
    // Test basic query
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection FAILED:', error);
      return false;
    } else {
      console.log('✅ Supabase connection SUCCESSFUL!');
      console.log('📊 Sample data:', data);
      return true;
    }
  } catch (error) {
    console.error('❌ Supabase test ERROR:', error);
    return false;
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [setupComplete, setSetupComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  useEffect(() => {
    // Test Supabase connection when app starts
    const initializeApp = async () => {
      console.log('🚀 Initializing app...');
      
      // Test Supabase connection
      const connected = await testSupabaseConnection();
      setSupabaseConnected(connected);
      
      // Check current auth session
      await checkUser();
    };

    initializeApp();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await checkUserProfile(session.user.id);
        } else {
          setUser(null);
          setSetupComplete(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      await checkUserProfile(session.user.id);
    }
    setLoading(false);
  };

  const checkUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    setSetupComplete(!!data && !error);
  };

  const handleAuthStateChange = (userData) => {
    setUser(userData);
    setSetupComplete(false);
  };

  const handleSetupComplete = async (profileData) => {
    setSetupComplete(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
        {!supabaseConnected && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            ⚠️ Supabase connection issues detected. Check console.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      {/* Debug banner - remove after testing */}
      {!supabaseConnected && (
        <div style={{
          background: '#ff6b6b',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          ⚠️ Supabase not connected. Profile data won't save.
        </div>
      )}
      
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
