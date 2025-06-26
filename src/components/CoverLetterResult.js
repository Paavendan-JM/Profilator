// src/components/CoverLetterResult.js
import React, { useState, useEffect } from 'react';
import './CoverLetterResult.css';
import { useLocation, useNavigate } from 'react-router-dom';

const CoverLetterResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, loading, fullName, formData } = location.state || {};

  const [editableResult, setEditableResult] = useState(result || '');

  useEffect(() => {
    if (result) setEditableResult(result);
  }, [result]);

  const wordCount = editableResult ? editableResult.trim().split(/\s+/).length : 0;

  const downloadAsDoc = () => {
    const blob = new Blob([editableResult], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fullName || 'CoverLetter'}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleBackToEdit = () => {
    navigate('/', { state: { formData } });
  };

  return (
    <div className="result-outer">
      <h2>Generated Cover Letter</h2>

      {loading ? (
        <p className="loading-text">⏳ Generating... Please wait ~4–5 minutes</p>
      ) : (
        <>
          <div
            className="result-inner editable-result"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={(e) => setEditableResult(e.currentTarget.innerText)}
          >
            {editableResult}
          </div>

          <p className="counter">📝 Word Count: {wordCount}</p>

          <button onClick={downloadAsDoc}>Download as Word Document</button>
          <button onClick={handleBackToEdit}>🔙 Back to Edit</button>
        </>
      )}
    </div>
  );
};

export default CoverLetterResult;
