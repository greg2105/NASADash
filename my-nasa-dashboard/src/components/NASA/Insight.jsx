// import React, { useState, useEffect } from 'react';
// import { fetchHistoricalInsightData } from '../../services/InsightService';

// const InsightSection = () => {
//   const [insightData, setInsightData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const startDate = '2017-11-26';
//         const endDate = '2018-11-26';
//         const historicalData = await fetchHistoricalInsightData(startDate, endDate);
//         console.log("Historical InSight Data:", historicalData);
//         setInsightData(historicalData);

//         setError(null);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderWeatherData = (data) => {
//     const solNumbers = Object.keys(data.validity_checks).filter(key => key !== "sol_hours_required" && key !== "sols_checked");
//     if (solNumbers.length === 0) return <p>No weather data available</p>;

//     return solNumbers.map(sol => {
//       const solData = data.validity_checks[sol];
//       return (
//         <div key={sol}>
//           <h3>Sol {sol}</h3>
//           {Object.entries(solData).map(([key, value]) => (
//             <div key={key}>
//               <h4>{key}</h4>
//               <p>Average: {value.av || 'N/A'}</p>
//               <p>Minimum: {value.mn || 'N/A'}</p>
//               <p>Maximum: {value.mx || 'N/A'}</p>
//               <p>Number of Measurements: {value.ct || 'N/A'}</p>
//             </div>
//           ))}
//         </div>
//       );
//     });
//   };

//   return (
//     <div>
//       <h2>InSight Weather Data</h2>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : insightData ? (
//         renderWeatherData(insightData)
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// };

// export default InsightSection;