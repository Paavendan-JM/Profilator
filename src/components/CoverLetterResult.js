// src/components/CoverLetterResult.js
import React from 'react';
import './CoverLetterResult.css';
import { useLocation } from 'react-router-dom';

const CoverLetterResult = () => {
  const location = useLocation();
  const { result, loading } = location.state || {};
  const wordCount = result ? result.trim().split(/\s+/).length : 0;

  return (
    <div className="result-outer">
      <h2>Generated Cover Letter</h2>

      {loading ? (
        <p className="loading-text">⏳ Generating... Please wait ~4-5 Minutes</p>
      ) : (
        <div className="result-inner">
          <div>{result}</div>  
          <p className='counter'>
            📝 Word Count: {wordCount}
            </p>        
        </div>
      )}
    </div>
  );
};

export default CoverLetterResult;
