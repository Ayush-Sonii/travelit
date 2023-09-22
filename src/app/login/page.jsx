'use client'
import '@/app/style/login.css'
import Link from 'next/link'
import React from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import { signIn, signOut,useSession } from 'next-auth/react';


function page(props,logRef) {
  const [user,setUser] = React.useState({
    email:'',
    password:''
  })
  const [loading,setLoading] = React.useState(false);
  const [message,setMessage] = React.useState('');
  const router = useRouter();
  const onLogin = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const resp = await axios.post("/api/users/login",user);
      console.log("Login Sucess",resp.data);
      router.push("/dashboard");
    } 
    catch (err) {
      console.log("Login Falied",err.message);
      setMessage(err.response.data.error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className={props.checkBlur?"wrapper bg-blur":"wrapper"}>
          <div className="containerLog" ref={logRef}>
            <form onSubmit={onLogin}>
              <input className='creds' type="email" required placeholder='Username/Email' onChange={(e)=>{setUser({...user,email:e.target.value});}}/>
              <input className='creds' type="password" required placeholder='Password' onChange={(e)=>{setUser({...user,password:e.target.value});}}/>
              <p className="pt-1 mt-1 text-sm font-semibold text-red-500 ">{message}</p>
              <Link className='text' href='#'>Forget Password?</Link>
              <input className={loading?"btn proc":"btn btn1"} type="submit" value={loading?"Logging in...":"Login"} />
            </form>
            <p className='p'>or</p>
            <button className={loading?"btn proc2":"btn btn2"} type="button" onClick={()=>{signIn('google',{ callbackUrl: "/dashboard" })}}>
              <img loading="lazy" height="18" width="18" id="provider-logo-dark" src="https://authjs.dev/img/providers/google.svg"/>
              <span>{loading?"Logging in...":"LOGIN WITH GOOGLE"}</span>
            </button>
          </div>
        </div>
    </>
  )
}
export default React.forwardRef(page);
