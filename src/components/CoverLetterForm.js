// src/components/CoverLetterForm.js
import React, { useState, useEffect } from 'react';
import './CoverLetterForm.css';
import { generateCoverLetter } from '../utils/ollamaApi';
import { useNavigate, useLocation } from 'react-router-dom';

const CoverLetterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate('/result', {
      state: {
        result: '',
        fullName: formData.fullName,
        loading: true,
        formData
      }
    });

    try {
      const raw = await generateCoverLetter(formData);
      const cleaned = raw.replace(/<think>[\s\S]*?<\/think>/, '').trim();

      navigate('/result', {
        state: {
          result: cleaned,
          fullName: formData.fullName,
          loading: false,
          formData
        }
      });
    } catch (err) {
      alert('Error generating cover letter');
      console.error(err);
    }
  };

  return (
    <form className="cover-form" onSubmit={handleSubmit}>
      <label>Full Name<input type="text" name="fullName" value={formData.fullName} required onChange={handleChange} /></label>
      <label>Program Applying To<input type="text" name="program" value={formData.program} required onChange={handleChange} /></label>
      <label>Target IIM<input type="text" name="iimTarget" value={formData.iimTarget} onChange={handleChange} /></label>
      <label>UG College Name<input type="text" name="ugCollege" value={formData.ugCollege} required onChange={handleChange} /></label>
      <label>Academic Background<textarea name="academic" value={formData.academic} required onChange={handleChange} /></label>
      <label>Work Experience<textarea name="workExp" value={formData.workExp} onChange={handleChange} /></label>
      <label>Internships<textarea name="internships" value={formData.internships} onChange={handleChange} /></label>
      <label>Certifications & Courses<textarea name="certifications" value={formData.certifications} onChange={handleChange} /></label>
      <label>Skills<textarea name="skills" value={formData.skills} onChange={handleChange} /></label>
      <label>Career Goals<textarea name="goals" value={formData.goals} required onChange={handleChange} /></label>
      <label>Why MBA / Why IIM?<textarea name="motivation" value={formData.motivation} required onChange={handleChange} /></label>
      <label>Voluntary Experience<textarea name="voluntary" value={formData.voluntary} onChange={handleChange} /></label>
      <label>Positions of Responsibility during UG<textarea name="pors" value={formData.pors} onChange={handleChange} /></label>
      <label>Sports / Clubs during UG<textarea name="sports" value={formData.sports} onChange={handleChange} /></label>
      <label>Academic Achievements<textarea name="academicAchievements" value={formData.academicAchievements} onChange={handleChange} /></label>
      <label>Extracurricular Achievements<textarea name="extracurriculars" value={formData.extracurriculars} onChange={handleChange} /></label>
      <label>Additional Info<textarea name="extraInfo" value={formData.extraInfo} onChange={handleChange} /></label>

      <button type="submit">Generate Cover Letter</button>
    </form>
  );
};

export default CoverLetterForm;
