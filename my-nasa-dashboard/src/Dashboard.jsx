import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import MainContent from './MainContent';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <MainContent />
    </div>
  );
};

export default Dashboard;