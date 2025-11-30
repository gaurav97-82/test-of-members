import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Discover = ({ user, onLogout }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchCourses();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      setUserProfile(data);
    }
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at');

    if (!error && data) {
      setCourses(data);
    }
  };

  return (
    <div className="discover-container">
      <header>
        <h2>Welcome, {userProfile?.full_name || user?.email}!</h2>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>

      {/* User Profile Info */}
      {userProfile && (
        <div className="profile-card">
          <h3>Your Profile</h3>
          <p><strong>Name:</strong> {userProfile.full_name}</p>
          <p><strong>Interests:</strong> {userProfile.interests || 'Not specified'}</p>
          <p><strong>Level:</strong> {userProfile.skill_level}</p>
        </div>
      )}

      {/* Courses */}
      <div className="courses-section">
        <h3>Available Courses</h3>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <span className="difficulty-badge">{course.difficulty_level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
