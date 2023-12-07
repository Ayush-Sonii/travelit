// components/TravelHistory.js
import React from 'react';

const TravelHistory = () => {
  const travelHistoryData = [
    { place: 'Jaipur', year: 2019 },
    { place: 'Goa', year: 2020 },
    { place: 'Kerala', year: 2021 },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Travel History</h3>
      <ul className="list-disc pl-4">
        {travelHistoryData.map((item, index) => (
          <li key={index} className="mb-2">{`${item.place} - ${item.year}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default TravelHistory;
