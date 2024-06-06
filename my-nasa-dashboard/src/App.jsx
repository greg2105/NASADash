import React from 'react';
import ReactDOM from 'react-dom/client';
import Buttons from './components/Buttons';
import StarrySky from './components/StarrySky';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Buttons />
    <StarrySky />
  </>
);