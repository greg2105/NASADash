// src/components/ContentArea.jsx
import React from 'react';
import ApodSection from './NASA/APOD'; // Make sure the path is correct
import './ContentArea.css';

const ContentArea = () => {
  return (
    <div className="content-area">
      <div className="content-card glass-panel">
        <ApodSection />
        <h1 className="title">NASA Space Explorer</h1>
      </div>
    </div>
  );
};

export default ContentArea;