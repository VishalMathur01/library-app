import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back one step in the browser history
  };

  return (
    <button className="back-button" onClick={handleBack}>
      Go Back
    </button>
  );
};

export default BackButton;