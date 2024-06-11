import React, { useState, useEffect } from 'react';
import { fetchDONKIData } from '../../services/DONKIService';

const DonkiSection = () => {
  const [donkiData, setDonkiData] = useState(null);
  const [startDate, setStartDate] = useState('2023-05-01');
  const [endDate, setEndDate] = useState('2023-05-15');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDONKIData('CME', {
          startDate,
          endDate,
          api_key: 'DEMO_KEY',
        });
        setDonkiData(data);
      } catch (error) {
        console.error('Error fetching DONKI data:', error);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="donki-container">
      <h2>Coronal Mass Ejection (CME) Data</h2>
      <div className="date-input-container">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      {donkiData ? (
        <div className="donki-data-container">
          <pre>{JSON.stringify(donkiData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DonkiSection;