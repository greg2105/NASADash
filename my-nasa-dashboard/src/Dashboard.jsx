import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';

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