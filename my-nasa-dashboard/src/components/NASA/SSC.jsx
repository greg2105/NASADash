// SatelliteSituationCenterSection.jsx
import React, { useState, useEffect } from 'react';
import { echoDataRequest, echoGraphRequest, echoQueryRequest } from '../../services/SatelliteSituationCenterService';

const SatelliteSituationCenterSection = () => {
  const [dataRequestResponse, setDataRequestResponse] = useState(null);
  const [graphRequestResponse, setGraphRequestResponse] = useState(null);
  const [queryRequestResponse, setQueryRequestResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Echo a data request
        const dataRequest = `
          <DataRequest>
            <!-- Your XML DataRequest goes here -->
          </DataRequest>
        `;
        const dataRequestData = await echoDataRequest(dataRequest);
        setDataRequestResponse(dataRequestData);

        // Echo a graph request
        const graphRequest = `
          <GraphRequest>
            <!-- Your XML GraphRequest goes here -->
          </GraphRequest>
        `;
        const graphRequestData = await echoGraphRequest(graphRequest);
        setGraphRequestResponse(graphRequestData);

        // Echo a query request
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
          {/* Render data request response here */}
          {/* You can access the response using dataRequestResponse */}
        </div>
      ) : (
        <p>Loading data request response...</p>
      )}

      {graphRequestResponse ? (
        <div>
          <h2>Graph Request Response</h2>
          {/* Render graph request response here */}
          {/* You can access the response using graphRequestResponse */}
        </div>
      ) : (
        <p>Loading graph request response...</p>
      )}

      {queryRequestResponse ? (
        <div>
          <h2>Query Request Response</h2>
          {/* Render query request response here */}
          {/* You can access the response using queryRequestResponse */}
        </div>
      ) : (
        <p>Loading query request response...</p>
      )}
    </div>
  );
};

export default SatelliteSituationCenterSection;