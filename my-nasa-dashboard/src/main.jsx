// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import StarsCanvas from './components/StarsCanvas';
import MainContent from './components/App';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StarsCanvas />
    <MainContent />
  </React.StrictMode>
);