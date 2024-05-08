// components/CustomItineraryCard.js
'use client'
import React from 'react';
import '@/app/style/customeImage.css'
import DayComponent from '@/app/components/itineraries/jaipur'

const CustomItineraryCard = ({ itinerary }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  // if(expanded){
  //   return(
  //     <div className="p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-500 h-full">
  //       <div className="m-2 bg-white h-full">
  //       <DayComponent/>
  //       </div>
        
  //     </div>
  //   )
  // }
  return (
    <div className={`customItineraryCard ${expanded ? 'expanded' : ''}`}>
      <div className='imageContainernew'>
        <img src={itinerary.img} alt={itinerary.destination} className='cardimage' />
      </div>
      <h2>{itinerary.destination}</h2>
      <p>Duration: {itinerary.duration}</p>
      <p>Budget: {itinerary.price}</p>
      {expanded?<p>{itinerary.description}</p>:<p></p>}
      <button onClick={toggleExpand}>{expanded?"See Less":"See More"}</button>
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
