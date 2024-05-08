'use client'
import Nav from './components/nav'
import Body from './components/body'
import About from './components/about'
import Footer from './components/footer'
import Login from './login/page'
import Signup from './signup/page'
import {useState,useRef,useEffect} from 'react'

export default function Home() {
  const [logActive,setLogActive] = useState(false);
  const [signActive,setSignActive] = useState(false);
  const setLog = (data)=>{
    setLogActive(data);
  }
  const setSign = (data)=>{
    setSignActive(data);
  }
  let logRef = useRef();
  let signRef = useRef();
  useEffect(()=>{
    let logHandler = (e)=>{
      if(logRef?.current){
        if(!logRef?.current.contains(e.target)){
          setLogActive(false);
        }
      }
    }
    let signHandler = (e)=>{
      if(signRef?.current){
        if(!signRef?.current.contains(e.target)){
          setSignActive(false);
        }
      }
    }
    document.addEventListener('mousedown',logHandler);
    document.addEventListener('mousedown',signHandler);
    return ()=>{
      document.removeEventListener('mousedown',logHandler);
      document.removeEventListener('mousedown',signHandler);
    }
  });
  return (
    <>
    <Nav setLog={setLog} setSign={setSign} isLoggedIn={false}/>
    {logActive && <Login checkBlur={true} ref={logRef}/>}
    {signActive && <Signup checkBlur={true} ref={signRef}/>}
    <Body/>
    <About/>
    <Footer/>
    </>
  )
}
