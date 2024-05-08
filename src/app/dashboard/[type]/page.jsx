'use client'
import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import Nav from '@/app/components/nav'

function Details({params}) {
    const [trips,setTrips] = React.useState([]);
    const [bills,setBills] = React.useState([]);
    const [taskLists,setTaskLists] = React.useState([]);
    const [fetching,setFetching] = React.useState(true);
    const [showTrip,setShowTrip] = React.useState(false);
    const [tripToShow,setTripToShow] = React.useState("");
    React.useEffect(()=>{
      async function getData(){
        try {
          const type = params.type;
          const temp = JSON.parse(localStorage.getItem('user'));
          const resp = await axios.get('/api/users/getDetails',{
            params: {
              email: temp.email,
            },
          })
          if(type=='trips'){
            setTrips(resp.data.res.trips);
          }
          else if(type=='bills'){
            setBills(resp.data.res.bills);
          }
          else if(type=='tasklist'){
            setTaskLists(resp.data.res.tasklists);
          }
        } catch (error) {
          console.log(error.message);
        } finally{
          setFetching(false);
        }
      }
      getData();
    },[])
    const parseAndDisplayPlan = (resp)=>{
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
    function calcTotal(expenses){
        let sum=0;
        expenses.forEach(expense => {
            sum = sum + expense.amounts.at(0);
        });
        return sum;
    }
    const getDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const paddedDay = day < 10 ? '0' + day : day;
        const paddedMonth = month < 10 ? '0' + month : month;
        return `${paddedDay}/${paddedMonth}/${year}`;
      };
    if(fetching){
        return (
          <>
            <div className="absolute text-3xl left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
              Loading...
            </div>
          </>)
      }
      if(showTrip){
        return(<>
          <div className="p-10 bg-[#3C7DBD] text-white absolute top-0 left-0 m-5">
              <h1 className="p-5 text-center font-bold text-slate-50">Your itinerary</h1>
              {parseAndDisplayPlan(tripToShow)}
              <button type="button" 
                className='px-5 py-2 bg-green-600 text-center m-2 text-white rounded-md hover:bg-green-400 hover:rounded-lg 
                  hover:shadow-md transition duration-150 ease-in-out'
                onClick={()=>{setShowTrip(false)}}>
                  Hide
              </button>
          </div>
          </>
        )
      }
  return (<>
    <Nav isLoggedIn={true}/>
        {trips.length>0?
            <div className="trips p-5 my-2 border-2 border-gray-700 absolute top-1/2 left-1/2 
                -translate-y-1/2 -translate-x-1/2 bg-[#293855] text-white">
                <h1 className="text-center font-bold text-3xl p-2 border-b-gray-700 m-3">Trips:</h1>
                <section style={{ margin: '20px' }}>
                {trips.map((trip, index) => (
                        <>
                        <button type="button" 
                        onClick={()=>{
                          setShowTrip(true);
                          setTripToShow(trip.itinerary);
                        }}
                        >
                          <div key={index} style={{ padding: '10px', display:'flex', justifyContent:'space-around' }}>
                            <div className='m-2'>Name: {trip.tripName}</div>
                            <div className='m-2'>From: {trip.source}</div>
                            <div className='m-2'>To: {trip.destination}</div>
                            <div className='m-2'>Start Date: {getDate(trip.startDate)}
                            </div>
                            <div className='m-2'>End Date: {getDate(trip.endDate)}
                            </div>
                          </div>
                        </button>
                        {/* {showTrip &&(
                          <div className="p-10 bg-[#3C7DBD] text-white absolute top-0 left-0">
                            <h1 className="p-5 text-center font-bold text-slate-50">Your itinerary</h1>
                            {parseAndDisplayPlan(trip.itinerary)}
                            <button type="button" className='px-5 py-2 bg-green-600 text-center 
                              m-2 text-white rounded-md hover:bg-green-400 hover:rounded-lg 
                              hover:shadow-md transition duration-150 ease-in-out'
                              onClick={()=>{setShowTrip(false)}}>
                                Hide
                              </button>
                          </div>
                        )} */}
                        </>
                    ))}
                </section>
            </div>
            :
            <>
                {bills.length>0?
                    <div className="p-5 mt-2 border-2 border-gray-700 absolute top-1/2 left-1/2 
                        -translate-y-1/2 -translate-x-1/2 bg-[#293855] text-white w-2/5">
                        <h1 className="text-center font-bold text-3xl p-2 border-b-gray-700 m-3">Bills:</h1>
                        <section className="flex justify-center flex-col" style={{ marginBottom: '20px' }}>
                        {bills.map((bill, index) => (
                                <Link href={`/billsplitter/${bill.billId}`}>
                                <div key={index} style={{ padding: '10px', display:'flex', justifyContent:'center' }}
                                className='flex-col'>
                                <div className='m-2'>BillId: {bill.billId}</div>
                                <div className='m-2'>Total amount: {calcTotal(bill.expenses)}</div>
                                <div className='m-2'>Status: <span className={bill.settled?"text-green-700":"text-red-700"}>
                                {bill.settled?"Settled":"Pending"}
                                </span></div>
                                </div>
                                </Link>
                            ))}
                        </section>
                    </div>
                    :
                    <div className="p-5 my-2 border-2 border-gray-700 absolute top-1/2 left-1/2 
                    -translate-y-1/2 -translate-x-1/2 bg-[#293855] text-white">
                        <h1 className="text-center font-bold text-3xl p-2 border-b-gray-700 m-3">Task Lists:</h1>
                        <section className="flex justify-center flex-col" style={{ marginBottom: '20px' }}>
                        {taskLists.map((list, index) => (
                                <Link href={`/todo/${list.roomId}`}>
                                <div key={index} style={{ padding: '10px', display:'flex', justifyContent:'center' }}>
                                <div className='m-2'>Id: {list.roomId}</div>
                                <div className='m-2'>Created at: {list.createdAt}</div>
                                </div>
                                </Link>
                            ))}
                        </section>
                    </div>
                }
            </>
        }
        </>
  )
}

export default Details