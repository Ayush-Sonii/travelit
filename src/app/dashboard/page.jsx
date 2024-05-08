// pages/dashboard.js
'use client'
import React from 'react';
import Nav from '../components/nav'
import axios from 'axios';


const Dashboard = () => {
  // Sample user data - replace with your own data fetching logic
  const [email,setEmail] = React.useState([]);
  const [name,setName] = React.useState([]);
  const [ongoingTrips,setOngoingTrips] = React.useState([]);
  const [upcomingTrips,setUpcomingTrips] = React.useState([]);
  const [pastTrips,setPastTrips] = React.useState([]);
  const [fetching,setFetching] = React.useState(true);
  React.useEffect(()=>{
    async function getData(){
      try {
        const temp = JSON.parse(localStorage.getItem('user'));
        const resp = await axios.get('/api/users/getDetails',{
          params: {
            email: temp.email,
          },
        })
        filterTrips(resp.data.res.trips);
        setEmail(resp.data.res._doc.email);
        setName(resp.data.res._doc.fname + resp.data.res._doc.lname);
      } catch (error) {
        console.log(error.message);
      } finally{
        setFetching(false);
      }
    }
    getData();
  },[])

  function filterTrips(trips){
    const past = [];
    const upcoming = [];
    const ongoing = [];
    trips.forEach(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      // console.log(startDate,endDate,new Date(Date.now()));
      if(endDate < Date.now()){
        past.push(trip);
      } else if(startDate > Date.now()){
        upcoming.push(trip);
      } else {
        ongoing.push(trip);
      }
    });
    setOngoingTrips(ongoing);
    setPastTrips(past);
    setUpcomingTrips(upcoming);
  }
  // const user = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   profilePhoto: '/profile.png', // Add your image path here
  //   upcomingTrips: [
  //     { destination: 'Paris, France', date: '2024-03-01' },
  //     { destination: 'Tokyo, Japan', date: '2024-04-15' },
  //   ],
  //   pastTrips: [
  //     { destination: 'New York, USA', date: '2023-01-20' },
  //     { destination: 'London, UK', date: '2023-02-15' },
  //   ],
  // };
  // const temp = {
  //   profilePhoto: '/profile.png', // Add your image path here
  //   upcomingTrips: [
  //     { destination: 'Paris, France', date: '2024-03-01' },
  //     { destination: 'Tokyo, Japan', date: '2024-04-15' },
  //   ],
  //   pastTrips: [
  //     { destination: 'New York, USA', date: '2023-01-20' },
  //     { destination: 'London, UK', date: '2023-02-15' },
  //   ],
  // }

  if(fetching){
    return (
      <>
        <div className="absolute text-3xl left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          Loading...
        </div>
      </>)
  } 
  return (
    <>
      <Nav isLoggedIn={true}/>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1024px', margin: '90px auto', padding: '20px'}}>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <img
            src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
            alt="Sample Image"
            className="place-image"
          style={{width:'20%', height:'20%'}}/>
        <div style={{ marginLeft: '20px', marginTop:'10px' }}>
          <h1 style={{ margin: '0 0 5px 0', fontSize:'45px' }}>{name}</h1>
          <p style={{ margin: '0', fontSize:'20px' }}>{email}</p>
          <button style={{ marginTop: '10px', cursor: 'pointer' }}>Change Password</button>
        </div>
      </div>
      
      <div className="trips p-4 my-2 border-y-2 border-gray-700">
        <h1 className="text-center font-bold text-3xl p-2 border-b-gray-700 m-3">Trips:</h1>
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{fontWeight:'bold', fontSize: '20px'}}>Ongoing Trip</h2>
          {ongoingTrips.length==0?
            <div className="p-2 text-center text-lg">No ongoing trip</div>
          :
            <>
              {ongoingTrips.map((trip, index) => (
                <div key={index} style={{ padding: '10px 0', display:'flex', justifyContent:'space-around' }}>
                  <div>From: {trip.source}</div>
                  <div>To: {trip.destination}</div>
                  <div>Name: {trip.tripName}</div>
                </div>
              ))}
            </>
          }
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{fontWeight:'bold', fontSize: '20px'}}>Past Trips</h2>
          {pastTrips.length==0?
            <div className="p-2 text-center text-lg">No past trip</div>
          :
            <>
              {pastTrips.map((trip, index) => (
                <div key={index} style={{ padding: '10px 0' , display:'flex', justifyContent:'space-around'}}>
                  <div>From: {trip.source}</div>
                  <div>To: {trip.destination}</div>
                  <div>Name: {trip.tripName}</div>
                </div>
              ))}
            </>
          }
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{fontWeight:'bold', fontSize: '20px'}}>Upcoming Trips</h2>
          {upcomingTrips.length==0?
            <div className="p-2 text-center text-lg">No upcoming trip</div>
          :
            <>
              {upcomingTrips.map((trip, index) => (
                <div key={index} style={{ padding: '10px 0' , display:'flex', justifyContent:'space-around'}}>
                  <div>From: {trip.source}</div>
                  <div>To: {trip.destination}</div>
                  <div>Name: {trip.tripName}</div>
                </div>
              ))}
            </>
          }
        </section>
      </div>

      <button style={{ width: '100%', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Sign Out
      </button>
    </div>
    </>
    
  );
};

export default Dashboard;


