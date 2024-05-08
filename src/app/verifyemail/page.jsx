'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect } from 'react';

export default function verifyemail() {
    const [token,setToken] = React.useState("");
    useEffect(()=>{
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken)
    },[]);

    const verifyUserEmail = async()=>{
        try {
            await axios.post('/api/users/verifyemail',{token});
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token]);

  return (
    <>
        <div className="container p-10">
            <div className=' absolute top-1/2 left-1/2 bg-neutral-200 text-center p-5 rounded-lg -translate-x-1/2 -translate-y-1/2
            h-72 w-96'>
                <p className='p-1 text-lg text-blue-400'>Your Email is Verified</p>
                <Link href='/login' ><button className=' rounded-lg py-2 px-5 text-white bg-blue-600 
                text-center mt-5 hover:bg-blue-800 hover:rounded-xl'>
                    Login</button></Link>
            </div>
        </div>
    </>
  )
}
