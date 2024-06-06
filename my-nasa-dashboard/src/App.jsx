import React from 'react';
import ReactDOM from 'react-dom/client';
import Buttons from './components/Buttons';
import StarrySky from './components/StarrySky';
import TestComponent from './components/TestComponent';
import './styles/reset.css';

const App = () => {
  return (
    <div>
      <div>
      <TestComponent />
    </div>
      <div className="starry-sky-container">
        <StarrySky />
      </div>
      {/* Rest of your app content */}
      <Buttons />
    </div>
  );
};

export default App;