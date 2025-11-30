import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const SetupProfile = ({ onComplete }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    interests: '',
    level: 'beginner'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      alert('Please enter your name');
      return;
    }

    setLoading(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }

      // Save to Supabase
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profileData.name,
          interests: profileData.interests,
          skill_level: profileData.level,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;

      console.log('Profile saved to Supabase:', data);
      onComplete(profileData);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="setup-profile-container">
      <h2>Setup Your Profile</h2>
      <p>Tell us about yourself to personalize your learning experience</p>
      
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
    </div>
  );
};

export default SetupProfile;
