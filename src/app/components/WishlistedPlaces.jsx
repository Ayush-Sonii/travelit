// components/WishlistedPlaces.js
import React from 'react';

const WishlistedPlaces = () => {
  const wishlistedPlacesData = [
    { place: 'Shimla', description: 'Snowy mountains and scenic beauty' },
    { place: 'Rishikesh', description: 'Spiritual retreat on the Ganges' },
    { place: 'Munnar', description: 'Tea gardens and lush greenery' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <h3 className="text-lg font-semibold mb-4">Wishlisted Places</h3>
      {wishlistedPlacesData.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-md shadow-md"
        >
          <h4 className="text-md font-semibold mb-2">{item.place}</h4>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WishlistedPlaces;
