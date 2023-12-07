// pages/index.js
'use client'
import React, { useState } from 'react';
import '@/app/style/customeImage.css'
//import Image from "next/image"
import generateItinerary from '../api/generateItinerary/itinerary';
import CustomItineraryCard from '../components/CustomItineraryCard';


function Page() {
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState('');
    const [budget, setBudget] = useState('');
    //const [itineraries, setItineraries] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);

    const itineraries = [
      {
        title: "Urban Delights",
        destination: "Goa",
        price: 800,
        duration: "4 days, 3 nights",
        description: "Immerse yourself in the vibrant city life, explore cultural gems, and indulge in local cuisine.",
        activities: [
          "Check-in at Cityscape Hotel",
          "Visit City Museum",
          "Enjoy local street food at Market Square",
          "Guided tour of Historic District",
          "Art gallery exploration",
          "Dinner at a traditional restaurant",
          "Nature reserve hike",
          "Picnic at the botanical gardens",
          "Sunset cruise along the river",
          "Souvenir shopping",
          "Check-out and depart"
        ],
        suggestedHotels: ["Cityscape Hotel"]
      },
      {
        title: "Sun, Sea, and Sand",
        destination: "Goa",
        price: 1200,
        duration: "6 days, 5 nights",
        description: "Relax on pristine beaches, discover coastal wonders, and savor seafood delights.",
        activities: [
          "Check-in at Seaside Resort",
          "Relax on the beach",
          "Seafood dinner by the shore",
          "Boat trip to nearby islands",
          "Snorkeling and beach games",
          "Beachfront barbecue",
          "Visit lighthouse and coastal trails",
          "Seafood cooking class",
          "Sunset beach yoga",
          "Explore local fishing village",
          "Visit maritime museum",
          "Dinner at a coastal restaurant",
          "Spa day at Coastal Serenity Spa",
          "Leisurely beach stroll",
          "Fine dining at the resort",
          "Check-out and depart with fond memories"
        ],
        suggestedHotels: ["Seaside Resort"]
      },
      {
        title: "Golden Triangle Expedition",
        destination: "Goa",
        price: 1200,
        duration: "7 days, 6 nights",
        description: "Discover the rich history and cultural heritage of India's Golden Triangle cities.",
        activities: [
          "Arrival in Delhi and check-in at Heritage Hotel",
          "Explore historical sites in Delhi",
          "Travel to Agra and visit the Taj Mahal",
          "Visit Agra Fort and Fatehpur Sikri",
          "Travel to Jaipur and explore the Pink City",
          "Visit Amber Fort and City Palace",
          "Discover the Hawa Mahal and Jantar Mantar",
          "Shopping in local markets",
          "Farewell dinner with traditional Rajasthani cuisine",
          "Check-out and depart"
        ],
        suggestedHotels: ["Heritage Hotel", "Luxury Palace Hotel"]
      },
      {
        title: "Spiritual Retreat in Varanasi",
        destination: "Goa",
        price: 900,
        duration: "5 days, 4 nights",
        description: "Experience the spiritual essence of Varanasi, the oldest living city in the world.",
        activities: [
          "Arrival in Varanasi and check-in at Riverside Retreat",
          "Boat ride on the Ganges River at sunrise",
          "Explore ancient temples and ghats",
          "Attend a Ganga Aarti ceremony",
          "Day trip to Sarnath",
          "Participate in a meditation session",
          "Discover Varanasi's silk industry",
          "Evening stroll along the ghats",
          "Farewell dinner with local cuisine",
          "Check-out and depart"
        ],
        suggestedHotels: ["Riverside Retreat", "Spiritual Guesthouse"]
      },
      {
        title: "Southern Spice Trail in Kerala",
        destination: "Goa",
        price: 1000,
        duration: "6 days, 5 nights",
        description: "Immerse yourself in the natural beauty and flavors of Kerala's spice plantations.",
        activities: [
          "Arrival in Kochi and check-in at Spice Plantation Resort",
          "Explore the historic Fort Kochi",
          "Visit a spice plantation and learn about spice cultivation",
          "Backwater cruise in Alleppey",
          "Kathakali dance performance",
          "Visit Periyar National Park",
          "Enjoy a houseboat stay in Kumarakom",
          "Ayurvedic spa experience",
          "Farewell dinner with traditional Kerala cuisine",
          "Check-out and depart"
        ],
        suggestedHotels: ["Spice Plantation Resort", "Backwater Retreat"]
      },
      {
        title: "Trekking in the Himalayas",
        destination: "Goa",
        price: 1500,
        duration: "8 days, 7 nights",
        description: "Embark on an adventurous trekking journey in the breathtaking landscapes of the Himalayas.",
        activities: [
          "Arrival in Manali and check-in at Mountain Lodge",
          "Trek to Solang Valley",
          "Explore Rohtang Pass",
          "Trek to Bhrigu Lake",
          "Visit Old Manali and Hadimba Temple",
          "Trek to Hampta Pass",
          "Enjoy a night at a mountain camp",
          "Trek back to Manali",
          "Farewell dinner with local mountain cuisine",
          "Check-out and depart"
        ],
        suggestedHotels: ["Mountain Lodge", "Alpine Camp"]
      },
      {
        title: "Goa Beach Getaway",
        destination: "Goa",
        price: 800,
        duration: "4 days, 3 nights",
        description: "Relax on the sandy beaches, explore vibrant markets, and enjoy the nightlife in Goa.",
        activities: [
          "Arrival in Goa and check-in at Beach Resort",
          "Relax on Calangute Beach",
          "Explore the Anjuna Flea Market",
          "Visit Fort Aguada",
          "Boat cruise on the Mandovi River",
          "Enjoy water sports at Baga Beach",
          "Explore Old Goa and its historic churches",
          "Nightlife in Tito's Lane",
          "Farewell dinner with Goan seafood",
          "Check-out and depart"
        ],
        suggestedHotels: ["Beach Resort", "Luxury Beach Villa"]
      }
      // ... (continue with the remaining itineraries)
    ];
    
    console.log(itineraries);
    
  
    const handleExplore = async () => {
      try {
        const generatedItinerary = await generateItinerary(destination, duration, budget);
        //const generatedItineraries = [{ image: 'YOUR_IMAGE_URL', ...JSON.parse(generatedItinerary) }];
        //setItineraries(generatedItineraries);
        setShowSidebar(true);
      } catch (error) {
        console.error('Error fetching data from OpenAI:', error);
      }
    };
  
    return (
      <div className='pageContainer'>
        {/* Image section */}
        <div className='imageContainer'>
          <img
            src='/images/customImage.jpg'
            alt="Custom Itinerary"
            className='customImage'
          />
  
          {/* Input fields over the image */}
          <div className='inputContainer'>
            <label htmlFor="destination">Destination</label>
            <input type="text" id="destination" placeholder="Destination" onChange={(e) => setDestination(e.target.value)} />
  
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" placeholder="Duration" onChange={(e) => setDuration(e.target.value)} />
  
            <label htmlFor="budget">Budget</label>
            <input type="text" id="budget" placeholder="Budget" onChange={(e) => setBudget(e.target.value)} />
  
            <button onClick={handleExplore}>Explore</button>
          </div>
        </div>
  
        {/* Text section */}
        <div className='textContainer'>
          <p>Customize your own itinerary with us.</p>
        </div>
  
        {/* Sidebar and Itineraries */}
        {showSidebar && (
          <div className='sidebarContainer'>
            {/* Sidebar component */}
            <div className='sidebar'>
              {/* Add content for the sidebar */}
            </div>
  
            {/* Itinerary cards */}
            <div className='itineraryContainer'>
              {itineraries.map((itinerary, index) => (
                <CustomItineraryCard key={index} itinerary={itinerary} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Page;
