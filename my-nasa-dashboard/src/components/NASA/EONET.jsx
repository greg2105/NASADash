// import React, { useState, useEffect } from 'react';
// import { fetchEONETData } from '../../services/EONETService';

// const EONET = () => {
//   const [eonetData, setEonetData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchEONETData('events');
//         setEonetData(data);
//       } catch (error) {
//         console.error('Error fetching EONET data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>EONET Events</h2>
//       {eonetData ? (
//         <div>
//           {eonetData.events.map((event) => (
//             <div key={event.id}>
//               <h3>{event.title}</h3>
//               <p>Category: {event.categories.join(', ')}</p>
//               <p>Date: {event.geometries[0].date}</p>
//               {/* Render additional event details as needed */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default EONET;