// import React from 'react'
// import Nav from '../components/nav'

// export default function page() {
//   return (
//     <>
//     <Nav isLoggedIn={true}/>
//     </>
//   )
// }
// import React from 'react'
// import Nav from '../components/nav'

// export default function page() {
//   return (
//     <>
//     <Nav isLoggedIn={true}/>
//     </>
//   )
// }



// pages/profile.js
'use client'
import React from 'react';
import Nav from '../components/nav';
import TravelHistory from '../components/TravelHistory';
import LikedBlogs from '../components/LikedBlogs';
import WishlistedPlaces from '../components/WishlistedPlaces';

const ProfilePage = () => {
  return (
    <div className="bg-gray-50">
      <Nav isLoggedIn={true} />
      <div className="container mx-auto mt-8 p-8">
        <h1 className="text-3xl font-semibold mb-8">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <TravelHistory />
          </div>
          <div>
            <LikedBlogs />
          </div>
          <div>
            <WishlistedPlaces />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
