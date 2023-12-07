// components/CustomItineraryCard.js
'use client'
import React from 'react';
import '@/app/style/customeImage.css'

const CustomItineraryCard = ({ itinerary }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`customItineraryCard ${expanded ? 'expanded' : ''}`}>
      <div className='imageContainernew'>
        <img src='./images/taj.jpg' alt={itinerary.destination} className='cardimage' />
      </div>
      <h2>{itinerary.destination}</h2>
      <p>Duration: {itinerary.duration}</p>
      <p>Budget: {itinerary.price}</p>
      <p>{itinerary.description}</p>
      <button onClick={toggleExpand}>See More</button>
    </div>
  );
};

// const CustomItineraryCard = ({ itinerary }) => {
//   // Implement your card UI here
//   return (
//     <div classname='customItineraryCard'>
//       <img src='/images/taj.jpg' alt={itinerary.destination} className='cardimage' />
//       <h2>{itinerary.destination}</h2>
//       <p>Duration: {itinerary.duration}</p>
//       <p>Budget: {itinerary.price}</p>
//       <p>{itinerary.description}</p>
//       {/* Add view more button with onClick handler to expand the card */}
//     </div>
//   );
// };

export default CustomItineraryCard;
