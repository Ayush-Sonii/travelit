'use client'
import '@/app/style/body.css'
import React from 'react';
import {useState, useEffect} from 'react'
export default function home() {
  const [headLine, setHeadline] = useState('');

  useEffect(()=>{
    const str = ['Y','o','u','r'];
    const str2 = ['O','u','r'];
    let newStr = '';
    let i=0;
    let j=0;
    setInterval(() => {
      if(i<4){
        newStr += str[i++];
      }
      else if(i>=4 && i<=8){
        i++;
      }
      else if(i==9){
        newStr = '';
        i++;
      }
      else if(j<3){
        newStr += str2[j++];
      }
      else if(j>=3 && j<=7){
        j++;
      }
      else{
        newStr = '';
        i=0;
        j=0;
      }
      setHeadline(newStr);
    }, 200);
  },[])
  return (
    <>
    <div className="desc">
      <div className="wrap relative left-[8%] top-[20%] max-h-[450px] max-w-screen-xl
       border-radius-sm flex flex-row border-radius-sm border-white border-solid border-2 rounded-md">
        <div className="content">
          <div className="heading">
            <h1>Plan your trip {headLine} <br/> way</h1>
          </div>
          <div className="buttons">
            <input className="btn btn1" type="submit" value="Start Planning"/>
            <input className="btn btn2" type="submit" value="Select a Plan"/>
          </div>
        </div>
        <div className="blank">

        </div>
      </div>
    </div>
    </>
  )
}

