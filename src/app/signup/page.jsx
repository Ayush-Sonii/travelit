'use client'
import '@/app/style/signup.css'
import Link from 'next/link'
import React from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

function page(props,logRef) {
  const[user,setUser] = React.useState({
    fname:'',
    lname:'',
    email:'',
    password:''
  })
  const [loading,setLoading] = React.useState(false);
  const [message,setMessage] = React.useState('');
  const router = useRouter();
  const onSignup = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await axios.post("/api/users/signup",user);
      console.log("Signup Sucess",resp.data);
      router.push("/login");
    } catch (err) {
      console.log("Signup failed",err.response.data);
      setMessage(err.response.data.error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className={props.checkBlur?"wrapper bg-blur":"wrapper"}>
          <div className="containerSign" ref={logRef}>
            <form onSubmit={onSignup}>
                <input className='creds' type="text" placeholder='First Name' onChange={(e)=>{setUser({...user,fname:e.target.value});}}/>
                <input className='creds' type="text" placeholder='Last Name' onChange={(e)=>{setUser({...user,lname:e.target.value});}}/>
                <input className='creds' type="email" placeholder='Username/Email' onChange={(e)=>{setUser({...user,email:e.target.value});}}/>
                <input className='creds' type="password" placeholder='Password' onChange={(e)=>{setUser({...user,password:e.target.value});}}/>
                <p className="pt-1 mt-1 text-sm font-semibold text-red-500 ">{message}</p>
                <input className={loading?"btn proc":"btn btn1"} type="submit" value={loading?"Signing Up...":"Sign Up"}/>
            </form>
            <p className='or'>or</p>
            <input className='btn btn2' type="button" value="SIGN UP WITH GOOGLE" />
          </div>
        </div>
    </>
  )
}
export default React.forwardRef(page);