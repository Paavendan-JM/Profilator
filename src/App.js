// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoverLetterForm from './components/CoverLetterForm';
import CoverLetterResult from './components/CoverLetterResult';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CoverLetterForm />} />
          <Route path="/result" element={<CoverLetterResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
