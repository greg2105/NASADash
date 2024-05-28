/* Basically just here to import all the different sections */

import React from 'react';
import APOD from './NASA/APOD';
import NeoWs from './NASA/NeoWs';

const MainContent = () => {
  return (
    <main>
      <APOD />
      <NeoWs />
    </main>
  );
};

export default MainContent;