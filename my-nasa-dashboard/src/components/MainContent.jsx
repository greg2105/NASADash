// MainContent.jsx
import React, { useState } from 'react';
import APOD from './NASA/APOD';
import DONKI from './NASA/DONKI';
import NeoWs from './NASA/NeoWs';
import Earth from './NASA/Earth';
// EONET API is weird, commenting out those lines
//import EONET from './NASA/EONET';

const MainContent = () => {
  const [showDonkiSection, setShowDonkiSection] = useState(false);
  const [showAPODSection, setShowAPODSection] = useState(false);
  const [showNeoWsSection, setShowNeoWsSection] = useState(false);
  const [showEarthSection, setShowEarthSection] = useState(false);
  //const [showEONETSection, setShowEONETSection] = useState(false);

  const handleShowDonkiSection = () => {
    setShowDonkiSection(!showDonkiSection);
  };

  const handleShowAPODSection = () => {
    setShowAPODSection(!showAPODSection);
  };

  const handleShowNeoWsSection = () => {
    setShowNeoWsSection(!showNeoWsSection);
  };

  const handleShowEarthSection = () => {
    setShowEarthSection(!showEarthSection);
  };

  // const handleShowEONETSection = () => {
  //   setShowEONETSection(!showEONETSection);
  // };

  return (
    <div>
      {showAPODSection ? (
        <APOD />
      ) : (
        <button onClick={handleShowAPODSection}>
          {showAPODSection ? 'Hide APOD Section' : 'Show APOD Section'}
        </button>
      )}
      {showDonkiSection ? (
        <DONKI />
      ) : (
        <button onClick={handleShowDonkiSection}>
          {showDonkiSection ? 'Hide DONKI Section' : 'Show DONKI Section'}
        </button>
      )}
      {showNeoWsSection ? (
        <NeoWs />
      ) : (
        <button onClick={handleShowNeoWsSection}>
          {showNeoWsSection ? 'Hide NeoWs Section' : 'Show NeoWs Section'}
        </button>
      )}
      {showEarthSection ? (
        <Earth />
      ) : (
        <button onClick={handleShowEarthSection}>
          {showEarthSection ? 'Hide Earth Section' : 'Show Earth Section'}
        </button>
      )}
      {/* {showEONETSection ? (
        <EONET />
      ) : (
        <button onClick={handleShowEONETSection}>
          {showEONETSection ? 'Hide EONET Section' : 'Show EONET Section'}
        </button>
      )} */}
    </div>
  );
};

export default MainContent;