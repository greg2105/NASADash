import React, { useState } from 'react';

import APOD from './NASA/APOD';
import DONKI from './NASA/DONKI';
import NeoWs from './NASA/NeoWs';
import Earth from './NASA/Earth';
import EPIC from './NASA/EPIC';
import Exoplanet from './NASA/Exoplanet';
import Insight from './NASA/Insight';
import IVL from './NASA/IVL';
import MRP from './NASA/MRP';
import SSC from './NASA/SSC';
import TechT from './NASA/TechT';
import TLE from './NASA/TLE';
import WMTS from './NASA/WMTS';

// EONET API is weird, commenting out those lines
//import EONET from './NASA/EONET';

const MainContent = () => {
  const [showDonkiSection, setShowDonkiSection] = useState(false);
  const [showAPODSection, setShowAPODSection] = useState(false);
  const [showNeoWsSection, setShowNeoWsSection] = useState(false);
  const [showEarthSection, setShowEarthSection] = useState(false);
  const [showEPICSection, setShowEPICSection] = useState(false);
  const [showExoplanetSection, setShowExoplanetSection] = useState(false);
  const [showInsightSection, setShowInsightSection] = useState(false);
  const [showIVLSection, setShowIVLSection] = useState(false);
  const [showMRPSection, setShowMRPSection] = useState(false);
  const [showSSCSection, setShowSSCSection] = useState(false);
  const [showTechTSection, setShowTechTSection] = useState(false);
  const [showTLESection, setShowTLESection] = useState(false);
  const [showWMTSSection, setShowWMTSSection] = useState(false);
  //const [showEONETSection, setShowEONETSection] = useState(false);

  const handleShowWMTSSection = () => {
    setShowWMTSSection(!showWMTSSection);
  };

  const handleShowTLESection = () => {
    setShowTLESection(!showTLESection);
  };

  const handleShowTechTSection = () => {
    setShowTechTSection(!showTechTSection);
  };

  const handleShowSSCSection = () => {
    setShowSSCSection(!showSSCSection);
  };

  const handleShowMRPSection = () => {
    setShowMRPSection(!showMRPSection);
  };

  const handleShowIVLSection = () => {
    setShowIVLSection(!showIVLSection);
  };

  const handleShowInsightSection = () => {
    setShowInsightSection(!showInsightSection);
  };

  const handleShowExoplanetSection = () => {
    setShowExoplanetSection(!showExoplanetSection);
  };

  const handleShowEPICSection = () => {
    setShowEPICSection(!showEPICSection);
  };

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

      {showEPICSection ? (
        <EPIC />
      ) : (
        <button onClick={handleShowEPICSection}>
          {showEPICSection ? 'Hide EPIC Section' : 'Show EPIC Section'}
        </button>
      )}

      {showExoplanetSection ? (
        <Exoplanet />
      ) : (
        <button onClick={handleShowExoplanetSection}>
          {showExoplanetSection ? 'Hide Exoplanet Section' : 'Show Exoplanet Section'}
        </button>
      )}

      {showInsightSection ? (
        <Insight />
      ) : (
        <button onClick={handleShowInsightSection}>
          {showInsightSection ? 'Hide Insight Section' : 'Show Insight Section'}
        </button>
      )}

      {showIVLSection ? (
        <IVL />
      ) : (
        <button onClick={handleShowIVLSection}>
          {showIVLSection ? 'Hide IVL Section' : 'Show IVL Section'}
        </button>
      )}

      {showMRPSection ? (
        <MRP />
      ) : (
        <button onClick={handleShowMRPSection}>
          {showMRPSection ? 'Hide MRP Section' : 'Show MRP Section'}
        </button>
      )}

      {showSSCSection ? (
        <SSC />
      ) : (
        <button onClick={handleShowSSCSection}>
          {showSSCSection ? 'Hide SSC Section' : 'Show SSC Section'}
        </button>
      )}

      {showTechTSection ? (
        <TechT />
      ) : (
        <button onClick={handleShowTechTSection}>
          {showTechTSection ? 'Hide TechT Section' : 'Show TechT Section'}
        </button>
      )}

      {showTLESection ? (
        <TLE />
      ) : (
        <button onClick={handleShowTLESection}>
          {showTLESection ? 'Hide TLE Section' : 'Show TLE Section'}
        </button>
      )}

      {showWMTSSection ? (
        <WMTS />
      ) : (
        <button onClick={handleShowWMTSSection}>
          {showWMTSSection ? 'Hide WMTS Section' : 'Show WMTS Section'}
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