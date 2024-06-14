// WMTSSection.jsx
import React, { useState, useEffect } from 'react';
import { getTileURL } from '../../services/WMTSService';

const WMTSSection = () => {
  const [tileURL, setTileURL] = useState(null);

  useEffect(() => {
    const fetchTileURL = () => {
      const tileMatrixSet = 'EQ/LRO_WAC_Mosaic_Global_303ppd_v02';
      const tileMatrix = 'default028mm';
      const tileRow = 0;
      const tileCol = 0;

      const url = getTileURL(tileMatrixSet, tileMatrix, tileRow, tileCol);
      setTileURL(url);
    };

    fetchTileURL();
  }, []);

  return (
    <div>
      {tileURL ? (
        <div>
          <h2>WMTS Tile URL</h2>
          <p>{tileURL}</p>
          <img src={tileURL} alt="WMTS Tile" />
        </div>
      ) : (
        <p>Loading WMTS tile URL...</p>
      )}
    </div>
  );
};

export default WMTSSection;