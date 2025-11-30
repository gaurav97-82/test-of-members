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
      
      console.log('🔄 Starting profile save process...');
      console.log('👤 Current user:', user);
      
      if (userError || !user) {
        throw new Error('No authenticated user found. Please login again.');
      }

      // Prepare profile data
      const profileToSave = {
        id: user.id,
        full_name: profileData.name,
        interests: profileData.interests,
        skill_level: profileData.level,
        updated_at: new Date().toISOString(),
      };

      console.log('💾 Saving profile data:', profileToSave);

      // Save to Supabase
      const { data, error: saveError } = await supabase
        .from('profiles')
        .upsert(profileToSave)
        .select();

      if (saveError) {
        console.error('❌ Supabase save error:', saveError);
        throw new Error(`Failed to save profile: ${saveError.message}`);
      }

      console.log('✅ Profile saved successfully:', data);
      
      // Also save to localStorage as backup
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));
      localStorage.setItem(`setupComplete_${user.id}`, 'true');
      
      onComplete(profileData);
      
    } catch (error) {
      console.error('❌ Error saving profile:', error);
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
    setError('');
  };

  return (
    <div className="setup-profile-container">
      <h2>Setup Your Profile</h2>
      <p>Tell us about yourself to personalize your learning experience</p>
      
      {error && (
        <div className="error-message">
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

      {/* Debug info - remove in production */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '0.9rem'
      }}>
        <h4>Debug Info</h4>
        <p><strong>User ID:</strong> Check browser console after login</p>
        <p><strong>Profile Data to Save:</strong> {JSON.stringify(profileData)}</p>
      </div>
    </div>
  );
};

export default SetupProfile;
