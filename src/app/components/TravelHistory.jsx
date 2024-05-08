// components/TravelHistory.js
import React from 'react';

const TravelHistory = () => {
  const travelHistoryData = [
    { place: 'Jaipur', year: 2019 },
    { place: 'Goa', year: 2020 },
    { place: 'Kerala', year: 2021 },
  ];

  return (
    <div className="bg-gray-200 p-4 rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Travel History</h3>
      <ul>
        {travelHistoryData.map((item, index) => (
          <li key={index}>{`${item.place} - ${item.year}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default TravelHistory;
