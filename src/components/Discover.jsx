import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Discover = ({ user, onLogout }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchCourses();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      // Get auth user details
      const { data: { user: authData } } = await supabase.auth.getUser();
      setAuthUser(authData);

      // Get profile data
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && profileData) {
        setUserProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCourses = async () => {
    // ... your existing courses code
  };

  return (
    <div className="discover-container">
      <header className="discover-header">
        <div>
          <h2>🎓 Prashikshan Learning</h2>
          {authUser && (
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>
              Logged in as: {authUser.email}
            </p>
          )}
        </div>
        <button onClick={onLogout} className="logout-button">
          Sign Out
        </button>
      </header>

      <div className="discover-content">
        {/* Enhanced User Profile Card */}
        <div className="profile-card">
          <h3>👋 Welcome back!</h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginTop: '1rem'
          }}>
            {/* Auth User Info */}
            <div>
              <h4>Account Info</h4>
              <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                <p><strong>Email:</strong> {authUser?.email}</p>
                <p><strong>User ID:</strong> {authUser?.id}</p>
                <p><strong>Last Sign In:</strong> {authUser?.last_sign_in_at ? new Date(authUser.last_sign_in_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div>
              <h4>Learning Profile</h4>
              <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                {userProfile ? (
                  <>
                    <p><strong>Name:</strong> {userProfile.full_name}</p>
                    <p><strong>Interests:</strong> {userProfile.interests || 'Not specified'}</p>
                    <p><strong>Level:</strong> <span style={{ textTransform: 'capitalize' }}>{userProfile.skill_level}</span></p>
                    <p><strong>Profile Created:</strong> {new Date(userProfile.created_at).toLocaleDateString()}</p>
                  </>
                ) : (
                  <p>No profile data found</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your courses section */}
        <div className="courses-section">
          <h3>📚 Available Courses</h3>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <h4>{course.title}</h4>
                <p>{course.description}</p>
                <span className={`difficulty-badge ${course.difficulty_level}`}>
                  {course.difficulty_level}
                </span>
                <button style={{
                  marginTop: '1rem',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Debug Section - Remove in production */}
        <div className="profile-card" style={{ background: '#fff3cd', border: '1px solid #ffeaa7' }}>
          <h4>🔧 Debug Information</h4>
          <details>
            <summary>View Raw Data</summary>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
              <strong>Auth User:</strong>
              <pre>{JSON.stringify(authUser, null, 2)}</pre>
              <strong>Profile Data:</strong>
              <pre>{JSON.stringify(userProfile, null, 2)}</pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Discover;
