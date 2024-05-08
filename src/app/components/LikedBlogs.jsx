// components/LikedBlogs.js
import React from 'react';

const LikedBlogs = () => {
  const likedBlogsData = [
    { title: 'Exploring the Rich Culture of Delhi', author: 'Traveler123' },
    { title: 'Beaches of Goa: A Paradise on Earth', author: 'AdventureSeeker' },
    { title: 'Spices and Aromas of Kerala', author: 'FoodieExplorer' },
  ];

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Liked Blogs</h3>
      {likedBlogsData.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-md shadow-md flex items-center space-x-4"
        >
          <div>
            <h4 className="text-md font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-600">{`Author: ${item.author}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedBlogs;
