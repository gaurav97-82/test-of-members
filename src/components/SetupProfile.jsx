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
      // Get current user from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      let userId;
      
      if (userError || !user) {
        console.log('No Supabase user, using mock user');
        // Fallback: create a mock user ID
        userId = `mock_user_${Date.now()}`;
      } else {
        userId = user.id;
        
        // Save to Supabase if we have a real user
        const { data, error: saveError } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            full_name: profileData.name,
            interests: profileData.interests,
            skill_level: profileData.level,
            updated_at: new Date().toISOString(),
          })
          .select();

        if (saveError) {
          console.error('Supabase save failed, using localStorage:', saveError);
          // Continue with localStorage fallback
        } else {
          console.log('✅ Profile saved to Supabase:', data);
        }
      }

      // Always save to localStorage as backup
      localStorage.setItem(`profile_${userId}`, JSON.stringify(profileData));
      localStorage.setItem(`setupComplete_${userId}`, 'true');
      
      console.log('✅ Profile setup completed');
      onComplete(profileData);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Error saving profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
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
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Learning Interests:</label>
          <input 
            type="text" 
            value={profileData.interests}
            onChange={(e) => handleChange('interests', e.target.value)}
            placeholder="e.g., Web Development, Data Science, Design"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Skill Level:</label>
          <select 
            value={profileData.level}
            onChange={(e) => handleChange('level', e.target.value)}
            disabled={loading}
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
    </div>
  );
};

export default SetupProfile;
