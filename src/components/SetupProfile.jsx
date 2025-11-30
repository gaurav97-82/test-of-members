import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const SetupProfile = ({ onComplete }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    interests: '',
    level: 'beginner'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error(`Auth error: ${userError.message}`);
      }
      
      if (!user) {
        throw new Error('No user found. Please login again.');
      }

      console.log('Saving profile for user:', user.id);

      // Save to Supabase
      const { data, error: saveError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profileData.name,
          interests: profileData.interests,
          skill_level: profileData.level,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (saveError) {
        throw new Error(`Database error: ${saveError.message}`);
      }

      console.log('Profile saved successfully:', data);
      onComplete(profileData);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user types
  };

  return (
    <div className="setup-profile-container">
      <h2>Setup Your Profile</h2>
      <p>Tell us about yourself to personalize your learning experience</p>
      
      {error && (
        <div className="error-message" style={{ 
          background: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input 
            type="text" 
            value={profileData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required 
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label>Learning Interests:</label>
          <input 
            type="text" 
            value={profileData.interests}
            onChange={(e) => handleChange('interests', e.target.value)}
            placeholder="e.g., Web Development, Data Science, Design"
          />
        </div>
        
        <div className="form-group">
          <label>Skill Level:</label>
          <select 
            value={profileData.level}
            onChange={(e) => handleChange('level', e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Saving...' : 'Complete Setup & Start Learning'}
        </button>
      </form>

      {/* Debug info */}
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <h4>Debug Info:</h4>
        <p><strong>Environment Variables Loaded:</strong> {import.meta.env.VITE_SUPABASE_URL ? 'Yes' : 'No'}</p>
        <p><strong>Supabase Client:</strong> {supabase ? 'Initialized' : 'Not initialized'}</p>
      </div>
    </div>
  );
};

export default SetupProfile;
