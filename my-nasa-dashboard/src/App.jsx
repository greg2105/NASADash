import React from 'react';
import ReactDOM from 'react-dom/client';
import Buttons from './components/Buttons';
import StarsCanvas from './components/StarsCanvas';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <StarsCanvas />
    <Buttons />
  </>
);