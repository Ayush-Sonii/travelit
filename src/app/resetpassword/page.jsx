'use client'
import React, { useEffect } from 'react'
import axios from 'axios';

export default function resetpassword() {
    const [valid,setValid] = React.useState(false);
    const [token,setToken] = React.useState("");
    const [pass,setPass] = React.useState("");
    const [rPass,setRpass] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [mailsent,setMailsent] = React.useState(false);
    const [message,setMessage] = React.useState('');

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])
    useEffect(()=>{
        if(token.length>0){
            setValid(true);
        }
    },[token])
    const validateUser = async(e)=>{
        e.preventDefault();
        try {
            const resp = await axios.post("/api/users/validateuser",{email});
            console.log(resp.data);
            setMailsent(true);
        } catch (err) {
            console.log(err.message);
            setMessage(err.response.data.error);
        }
    }
    const setPassword = async(e)=>{
        e.preventDefault();
        if(rPass!=pass){
            setMessage("Please enter same passwords");
            return;
        }
        try {
            const resp = await axios.post("/api/users/resetpassword",{token,pass});
            console.log(resp.data);
            setMailsent(true);
        } catch (err) {
            console.log(err.message);
            setMessage(err.response.data.error);
        }
    }
  return (
    <>
       {valid?
            <div className="container p-10">
                <div className=' absolute top-1/2 left-1/2 bg-neutral-200 text-center p-5 
                rounded-lg -translate-x-1/2 -translate-y-1/2 h-80 w-96 shadow-lg'>
                    <h1 className='text-2xl p-2 text-center font-bold'>Reset Your Password</h1>
                    <form className='p-5 text-center' onSubmit={setPassword}>
                        <input type="password" placeholder='New Password' className='outline-none m-2 p-2 border-none
                         w-full text-black hover:shadow-md hover:outline-1 active:shadow-md active:outline-2' 
                         onChange={(e)=>{setPass(e.target.value)}}/>
                        <input type="password" placeholder='Confirm New Password' className='outline-none border-none m-2 p-2
                         w-full text-black hover:shadow-md hover:outline-1 active:shadow-md active:outline-2' 
                         onChange={(e)=>{setRpass(e.target.value)}}/>
                         <p className="pt-1 mt-1 text-sm font-semibold text-red-500 ">{message}</p>
                        <input type="submit" value="Submit" className='px-5 py-2 bg-blue-600 text-center text-white
                         rounded-md hover:rounded-xl hover:bg-blue-800 m-6' />
                    </form>
                </div>
            </div>
       :
            <>
                {mailsent?   
                    <div className="container p-10">
                        <div className=' absolute top-1/2 left-1/2 bg-neutral-200 text-center p-5 
                        rounded-lg -translate-x-1/2 -translate-y-1/2 h-74 w-96 shadow-lg'>
                            <h1 className='text-2xl p-2 text-center font-bold'>Reset Your Password</h1>
                            <p className='p-2 m-2 text-center font=semibold'>
                                A mail has been sent to you.<br/>Please check your email.</p>
                        </div>
                    </div>
                    :
                    <div className="container p-10">
                        <div className=' absolute top-1/2 left-1/2 bg-neutral-200 text-center p-5 
                        rounded-lg -translate-x-1/2 -translate-y-1/2 h-74 w-96 shadow-lg'>
                            <h1 className='text-2xl p-2 text-center font-bold'>Reset Your Password</h1>
                            <form className='p-5 text-center' onSubmit={validateUser}>
                                <input type="email" placeholder='Enter your email' className='outline-none m-2 p-2 border-none
                                w-full text-black hover:shadow-md hover:outline-1 active:shadow-md active:outline-2' 
                                onChange={(e)=>{setEmail(e.target.value)}}/>
                                <p className="pt-1 mt-1 text-sm font-semibold text-red-500 ">{message}</p>
                                <input type="submit" value="Submit" className='px-5 py-2 bg-blue-600 text-center text-white
                                rounded-md hover:rounded-xl hover:bg-blue-800 m-6' />
                            </form>
                        </div>
                    </div>
                }
            </>
       } 
    </>
  )
}
