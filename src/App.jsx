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

  useEffect(() => {
    // Check current auth session
    checkUser();
    
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
