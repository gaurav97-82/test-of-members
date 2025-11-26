// src/components/SetupProfile.js
import React, { useState } from 'react';
import './SetupProfile.css';

const SetupProfile = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      bio: '',
      location: ''
    },
    skills: [],
    interests: []
  });

  const handlePersonalDetails = (data) => {
    setFormData(prev => ({ ...prev, personalDetails: data }));
    setStep(2);
  };

  const handleSkills = (skills) => {
    setFormData(prev => ({ ...prev, skills }));
    setStep(3);
  };

  const handleInterests = (interests) => {
    setFormData(prev => ({ ...prev, interests }));
    // Complete setup
    onComplete({ ...formData, interests });
  };

  return (
    <div className="setup-container">
      <div className="setup-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Personal Details</p>
        </div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Skills</p>
        </div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <span>3</span>
          <p>Interests</p>
        </div>
      </div>

      {step === 1 && <PersonalDetailsStep onSubmit={handlePersonalDetails} />}
      {step === 2 && <SkillsStep onSubmit={handleSkills} />}
      {step === 3 && <InterestsStep onSubmit={handleInterests} />}
    </div>
  );
};

const PersonalDetailsStep = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="setup-form">
      <h2>Tell us about yourself</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          rows="3"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
        />
      </div>
      <button type="submit" className="btn-primary">Next</button>
    </form>
  );
};

const SkillsStep = ({ onSubmit }) => {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills(prev => [...prev, currentSkill]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="setup-form">
      <h2>Add your skills</h2>
      <div className="skills-input">
        <input
          type="text"
          placeholder="Add a skill"
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
        />
        <button type="button" onClick={addSkill}>Add</button>
      </div>
      <div className="skills-list">
        {skills.map(skill => (
          <span key={skill} className="skill-tag">
            {skill}
            <button onClick={() => removeSkill(skill)}>×</button>
          </span>
        ))}
      </div>
      <button 
        onClick={() => onSubmit(skills)} 
        className="btn-primary"
        disabled={skills.length === 0}
      >
        Next
      </button>
    </div>
  );
};

const InterestsStep = ({ onSubmit }) => {
  const interestsList = ['Technology', 'Sports', 'Music', 'Art', 'Travel', 'Food', 'Fitness', 'Reading', 'Gaming', 'Photography'];
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="setup-form">
      <h2>Select your interests</h2>
      <div className="interests-grid">
        {interestsList.map(interest => (
          <button
            key={interest}
            type="button"
            className={`interest-btn ${selectedInterests.includes(interest) ? 'selected' : ''}`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </button>
        ))}
      </div>
      <button 
        onClick={() => onSubmit(selectedInterests)} 
        className="btn-primary"
        disabled={selectedInterests.length === 0}
      >
        Complete Setup
      </button>
    </div>
  );
};

export default SetupProfile;
