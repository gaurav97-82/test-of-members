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
    } else {
      // Sample courses if none in database
      setCourses([
        {
          id: 1,
          title: "React Fundamentals",
          description: "Learn React from scratch with hands-on projects",
          difficulty_level: "beginner"
        },
        {
          id: 2,
          title: "Advanced JavaScript",
          description: "Master modern JavaScript concepts and patterns",
          difficulty_level: "intermediate"
        },
        {
          id: 3,
          title: "Full Stack Development",
          description: "Build complete web applications from frontend to backend",
          difficulty_level: "advanced"
        }
      ]);
    }
  };

  return (
    <div className="discover-container">
      <header className="discover-header">
        <h2>🎓 Prashikshan Learning</h2>
        <button onClick={onLogout} className="logout-button">
          Sign Out
        </button>
      </header>

      <div className="discover-content">
        {/* Welcome Section */}
        <div className="profile-card">
          <h3>👋 Welcome back, {userProfile?.full_name || user?.email}!</h3>
          <p>Ready to continue your learning journey?</p>
        </div>

        {/* User Profile */}
        {userProfile && (
          <div className="profile-card">
            <h3>📝 Your Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <strong>Name:</strong>
                <p>{userProfile.full_name}</p>
              </div>
              <div>
                <strong>Interests:</strong>
                <p>{userProfile.interests || 'Not specified'}</p>
              </div>
              <div>
                <strong>Level:</strong>
                <p style={{ textTransform: 'capitalize' }}>{userProfile.skill_level}</p>
              </div>
            </div>
          </div>
        )}

        {/* Courses */}
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
      </div>
    </div>
  );
};

export default Discover;
