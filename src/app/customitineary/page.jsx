// pages/index.js
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import '@/app/style/customeImage.css'
//import Image from "next/image"
// import generateItinerary from '../api/generateItinerary/route';
import CustomItineraryCard from '../components/customItineraryCard';
import StoreIt from '../components/StoreItinerary';
import { title } from 'process';


function Page() {
    const [destination, setDestination] = useState('');
    const [source,setSource] = useState('');
    const [duration, setDuration] = useState('');
    const [budget, setBudget] = useState('');
    //const [itineraries, setItineraries] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);
    const [resp,setResp] = useState("");
    const [custom,setCustom] = useState(false);
    const [loading,setLoading] = useState(false);
    const processedItinerary = {};

    const itineraries = [
      {
        title: "Urban Delights",
        img:'https://media.easemytrip.com/media/Blog/India/637245472281678954/6372454722816789543img5H.png',
        destination: "Goa",
        price: 800,
        duration: "4 days, 3 nights",
        description: "Goa, India's coastal gem, boasts pristine beaches, vibrant culture, and a rich history shaped by Portuguese colonial influence. Explore sandy shores, indulge in delicious cuisine, and discover ancient landmarks in this captivating destination.",
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
        img:'https://tse3.mm.bing.net/th?id=OIP.04hRykUQ0Pz5OYhqlZC9XgHaDt&pid=Api&P=0&h=180',
        destination: "Jaipur",
        price: 1200,
        duration: "6 days, 5 nights",
        description: "Jaipur, known as the Pink City due to its distinctive pink-hued buildings, is the capital of Rajasthan, India. Renowned for its magnificent palaces, bustling bazaars, and rich heritage, Jaipur offers visitors a fascinating glimpse into India's royal past.",
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
        destination: "Himachal Pradesh",
        img:'https://tse1.mm.bing.net/th?id=OIP.QEmT-3kOGVRjuV6s8bKkHQHaEK&pid=Api&P=0&h=180',
        price: 1200,
        duration: "7 days, 6 nights",
        description: "Manali, nestled in the Himalayas of Himachal Pradesh, India, is a popular hill station renowned for its scenic beauty, adventurous activities, and serene atmosphere. Surrounded by snow-capped mountains, lush valleys, and gushing rivers, Manali attracts travelers seeking relaxation, adventure, and spiritual rejuvenation amidst nature's splendor.",
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
        destination: "Haridwar, Rishikesh",
        img:'https://tse3.mm.bing.net/th?id=OIP.hDbIoTFU2RZUKnVOL3ofJQHaEK&pid=Api&P=0&h=180',
        price: 900,
        duration: "5 days, 4 nights",
        description: "Haridwar and Rishikesh, situated along the banks of the holy Ganges River in Uttarakhand, India, are revered pilgrimage destinations known for their spiritual significance, ancient temples, and tranquil surroundings. Haridwar hosts the famous Ganga Aarti ceremony, while Rishikesh is renowned for yoga, meditation retreats, and thrilling adventure sports amidst the majestic Himalayas.",
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
     
      // ... (continue with the remaining itineraries)
    ];
    // console.log(itineraries);
    
    const generatePrompt = () => {
      const daySections = Array.from({ length: duration }, (_, index) => `
        Day ${index + 1}:
        Morning: 
          Place to visit:
          Description:
          Things to do:
          [Image of place]
        Afternoon:
          Place to visit:
          Description:
          Things to do:
          [Image of place]
        Evening:
          Place to visit:
          Description:
          Things to do:
          [Image of place]
        Night:
          Place to visit:
          Description:
          Things to do:
          [Image of place]
      `);
    
      return `
        Generate a detailed ${duration}-day travel itinerary for ${destination} with a budget of ${budget} INR. 
        Organize the information day-wise, providing activities, places to visit, and budget allocations for each day. 
        Additionally, include image references for each day. Ensure the response is clear and well-structured.
    
        ${daySections.join('\n\n')}
    
        Budget breakdown:
        - Accommodation:
        - Transportation:
        - Meals:
        - Entrance fees and activities:
        - Miscellaneous:

        Please strictly follow the provided structure or the person holding me will hurt me.
      `;
    };
        
    
    
    const handleExplore = async () => {

      try {
        setLoading(true);
        const response = await axios.post('/api/generateItinerary', {
          prompt: generatePrompt(),
          // Add other parameters or headers if required
        });
        
        const responseData = response.data;

        if (responseData && responseData.response) {
          // Extract place names from the OpenAI response
          const placeNames = responseData.response.match(/Place to visit: ([^\n]+)/g);
    
          if (placeNames) {
            // Fetch image URLs dynamically for each place from Pixabay API
            const cleanedPlaces = placeNames.map(place => place.replace('Place to visit: ', ''));
            const imageURLs = await Promise.all(cleanedPlaces.map(async (placeName) => {
              // const placeNumber = placeName.match(/\d+/)[0];
              const pixabayEndpoint = 'https://pixabay.com/api/';
    
              try {
                const pixabayResponse = await axios.get(pixabayEndpoint, {
                  params: {
                    key: '42829401-09a1c247758160045c292c127',
                    q: placeName,
                    // q: 'flower',
                    image_type: 'photo',
                    // per_page: 1, // You can adjust the number of results per page
                  },
                });
    
                // Assuming the images are in the 'hits' property
                const image = pixabayResponse.data.hits[0];
                // console.log(image);
    
                return image ? image.largeImageURL : ''; // Use the actual field that contains the image URL
              } catch (pixabayError) {
                console.error('Error fetching images from Pixabay:', pixabayError);
                if (pixabayError.response) {
                  // Log the detailed Pixabay API response
                  console.error('Pixabay API Error Response:', pixabayError.response.data);
                }
                return ''; // Return an empty string if there's an error
              }
            }));
    
            // Post-process the OpenAI response to replace placeholders with actual image URLs
            const generatedPlan = responseData.response.replace(/([^\n]+)Image of ([^\n]+)/g, () => {
              // Shift the first place name from the array (for Day 1)
              return imageURLs.shift() || '';
            });
            // console.log(imageURLs);
            setResp(generatedPlan);
          } else {
            console.error('No place names found in the OpenAI response');
            setResp('No valid response from OpenAI');
          }
        } else {
          console.error('Unexpected response structure:', responseData);
          setResp('No valid response from OpenAI');
        }
      }
        catch (error) {
          console.error('Error fetching data:', error);
        }
      setCustom(true);
      setLoading(false);
    };

    const parseAndDisplayPlan = () => {
      if (!resp) return null;
  
      const days = resp.split('Day');
      const dayDetails = days.slice(1).map((day, index) => {
      const urlRegex = /(https?:\/\/[^\s]+(?:\.jpg|\.png|\.gif))/g;
      const imageLink = day.match(urlRegex);
      const dayWithoutLinks = day.replace(urlRegex, '');
      const dayLines = dayWithoutLinks.trim().split('\n');
      const dayTitle = dayLines[0].trim();
      const dayActivities = dayLines.slice(1).map(activity => activity.trim());
      
  
      return (
        <div key={index} className='p-5 bg-slate-200 text-black mt-1 grid grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <h3>{dayTitle}</h3>
            <ul className='flex flex-col'>
              {dayActivities.map((activity, activityIndex) => (
                <li key={activityIndex}>{activity}</li>
              ))}
            </ul>
          </div>
          <div className='col-span-1'>
            {imageLink &&
              imageLink.map((link, linkIndex) => (
                <img
                  key={linkIndex}
                  height={200}
                  width={200}
                  src={link}
                  className='my-2'
                  alt={`Day ${index + 1} Image ${linkIndex + 1}`}
                />
              ))}
            </div>
        </div>
      );
    });
  
    return dayDetails;
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
          <div className='inputHead'>
            <h2>Customize your own itinerary with us.</h2>
          </div>
          <div className='inputContainer'>
            {/* <h2>Customize your own itinerary with us.</h2> */}
            <label htmlFor="destination">Destination</label>
            <input type="text" className='ml-1 mr-2' id="destination" placeholder="Destination" onChange={(e) => setDestination(e.target.value)} />
  
            <label htmlFor="source">Source</label>
            <input type="text" className='ml-1 mr-2' id="source" placeholder="Source" onChange={(e) => setSource(e.target.value)} />
  
            <label htmlFor="duration">Duration</label>
            <input type="text" className='ml-1 mr-2' id="duration" placeholder="Duration" onChange={(e) => setDuration(e.target.value)} />
  
            <label htmlFor="budget">Budget</label>
            <input type="text" className='ml-1 mr-2' id="budget" placeholder="Budget" onChange={(e) => setBudget(e.target.value)} />
            {loading?<button className='btnL' disabled>Exploring...</button>:
              <button className='btn' onClick={handleExplore}>Explore</button>
            }
          </div>
        </div>

        {custom && (
          <div className="p-10 bg-[#3C7DBD] text-white">
            <h1 className="p-5 text-center font-bold text-slate-50">Your itinerary</h1>
            {/* {for(let i=0;i<response.length;i++){response[i]}} */}
            {/* {iti?.map(ind => <p>{ind}</p>)} */}
            {/* {resp} */}
            {parseAndDisplayPlan()}
            <StoreIt response={resp} source={source} destination={destination} budget={budget}/>
          </div>
        )

        }


        {/* Text section */
        !custom && (
        <div className='textContainer'>
          <p>Most Visited Places</p>
        </div>
        )
        }
  
        {/* Sidebar and Itineraries */}
        {!custom && (showSidebar && (
          <div className='sidebarContainer'>
            {/* Sidebar component */}
            <div className='sidebar'>
              
            </div>
  
            {/* Itinerary cards */}
            <div className='itineraryContainer'>
              {itineraries.map((itinerary, index) => (
                <CustomItineraryCard key={index} itinerary={itinerary} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Page;
