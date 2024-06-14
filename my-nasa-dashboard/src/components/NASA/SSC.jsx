// SatelliteSituationCenterSection.jsx
import React, { useState, useEffect } from 'react';
import { echoDataRequest, echoGraphRequest, echoQueryRequest } from '../../services/SSCService';

const SatelliteSituationCenterSection = () => {
  const [dataRequestResponse, setDataRequestResponse] = useState(null);
  const [graphRequestResponse, setGraphRequestResponse] = useState(null);
  const [queryRequestResponse, setQueryRequestResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRequest = `
          <DataRequest>
            <!-- Your XML DataRequest goes here -->
          </DataRequest>
        `;
        const dataRequestData = await echoDataRequest(dataRequest);
        setDataRequestResponse(dataRequestData);

        const graphRequest = `
          <GraphRequest>
            <!-- Your XML GraphRequest goes here -->
          </GraphRequest>
        `;
        const graphRequestData = await echoGraphRequest(graphRequest);
        setGraphRequestResponse(graphRequestData);

        const queryRequest = `
          <QueryRequest>
            <!-- Your XML QueryRequest goes here -->
          </QueryRequest>
        `;
        const queryRequestData = await echoQueryRequest(queryRequest);
        setQueryRequestResponse(queryRequestData);
      } catch (error) {
        console.error('Error fetching satellite situation center data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {dataRequestResponse ? (
        <div>
          <h2>Data Request Response</h2>
          
        </div>
      ) : (
        <p>Loading data request response...</p>
      )}

      {graphRequestResponse ? (
        <div>
          <h2>Graph Request Response</h2>
          
        </div>
      ) : (
        <p>Loading graph request response...</p>
      )}

      {queryRequestResponse ? (
        <div>
          <h2>Query Request Response</h2>
          
        </div>
      ) : (
        <p>Loading query request response...</p>
      )}
    </div>
  );
};

export default SatelliteSituationCenterSection;