import React, { useState } from 'react';
import './CoverLetterForm.css';
import { generateCoverLetter } from '../utils/ollamaApi';
import { useNavigate } from 'react-router-dom';

const CoverLetterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    program: '',
    iimTarget: '',
    ugCollege: '',
    academic: '',
    workExp: '',
    internships: '',
    certifications: '',
    skills: '',
    goals: '',
    motivation: '',
    voluntary: '',
    pors: '',
    sports: '',
    academicAchievements: '',
    extracurriculars: '',
    extraInfo: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Navigate to /result with loading screen
    navigate('/result', {
      state: {
        result: '',
        fullName: formData.fullName,
        loading: true
      }
    });

    try {
      const raw = await generateCoverLetter(formData);
      const cleaned = raw.replace(/<think>[\s\S]*?<\/think>/, '').trim();

      // Step 2: Navigate again with result
      navigate('/result', {
        state: {
          result: cleaned,
          fullName: formData.fullName,
          loading: false
        }
      });
    } catch (err) {
      alert('Error generating cover letter');
      console.error(err);
    }
  };

  return (
    <form className="cover-form" onSubmit={handleSubmit}>
      <label>Full Name<input type="text" name="fullName" required onChange={handleChange} /></label>
      <label>Program Applying To<input type="text" name="program" required onChange={handleChange} /></label>
      <label>Target IIM<input type="text" name="iimTarget" onChange={handleChange} /></label>
      <label>UG College Name<input type="text" name="ugCollege" required onChange={handleChange} /></label>
      <label>Academic Background<textarea name="academic" required onChange={handleChange} /></label>
      <label>Work Experience<textarea name="workExp" onChange={handleChange} /></label>
      <label>Internships<textarea name="internships" onChange={handleChange} /></label>
      <label>Certifications & Courses<textarea name="certifications" onChange={handleChange} /></label>
      <label>Skills<textarea name="skills" onChange={handleChange} /></label>
      <label>Career Goals<textarea name="goals" required onChange={handleChange} /></label>
      <label>Why MBA / Why IIM?<textarea name="motivation" required onChange={handleChange} /></label>
      <label>Voluntary Experience<textarea name="voluntary" onChange={handleChange} /></label>
      <label>Positions of Responsibility during UG<textarea name="pors" onChange={handleChange} /></label>
      <label>Sports / Clubs during UG<textarea name="sports" onChange={handleChange} /></label>
      <label>Academic Achievements<textarea name="academicAchievements" onChange={handleChange} /></label>
      <label>Extracurricular Achievements<textarea name="extracurriculars" onChange={handleChange} /></label>
      <label>Additional Info<textarea name="extraInfo" onChange={handleChange} /></label>

      <button type="submit">Generate Cover Letter</button>
    </form>
  );
};

export default CoverLetterForm;
