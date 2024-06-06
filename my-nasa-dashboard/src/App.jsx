import React from 'react';
import ReactDOM from 'react-dom/client';
import Buttons from './components/Buttons';
import StarrySky from './components/StarrySky';
import Text from './components/Text'; // Import the Text component
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Buttons />
    <StarrySky />
    <Text /> {/* Render the Text component */}
  </>
);