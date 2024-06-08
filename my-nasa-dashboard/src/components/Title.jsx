// src/Title.jsx
import React from 'react';
import '../styles/Title.css';
import githubIcon from '../../public/github.svg';
import mailIcon from '../../public/mail.svg';

const Title = () => {
  return (
    <div className="title-container">
      <h1 className="title">NebulAPI</h1>
      <a
        href="https://github.com/greg2105"
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        <img src={githubIcon} alt="GitHub" className="icon" />
      </a>
      <a href="mailto:gregdorazio533@gmail.com" className="btn">
        <img src={mailIcon} alt="Email" className="icon" />
      </a>
    </div>
  );
};

export default Title;