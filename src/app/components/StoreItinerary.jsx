import axios from "axios";
import {useRouter} from 'next/navigation';
import React from "react";

function StoreItinerary({response,source,destination,budget}) {
    const [clicked,setClicked] = React.useState(false);
    const [tripName,setTripName] = React.useState("");
    const [startDate,setStartDate] = React.useState(Date.now());
    const [endDate,setEndDate] = React.useState(Date.now());
    const [loading,setLoading] = React.useState(false);
    const router = useRouter();
    React.useEffect(()=>{
      window.scroll(0,0);
      //document.body.style.backgroundColor = "blue";
    },[clicked])
    const storeIt = async (e)=>{
      e.preventDefault();
      try {
        setLoading(true)
        const userDetails = JSON.parse(localStorage.getItem('user'));
        const userEmail = userDetails.email;
        // const data = {email:userEmail,tN:tripName,sD:startDate,eD:endDate,src:source,dst:destination,bgt:budget,
          // itinerary:response};
          //console.log(data);
        // const resp = await axios.post('/api/trip/saveTripDetails',data);
        const resp = await axios.post('/api/trip/saveTripDetails',{userEmail,tripName,startDate,endDate,source,destination,budget,
          response});
        console.log("Trip Data Saved",resp.data);
        router.push('/home');
      } catch (error) {
        console.log(error.message);
      }
      finally{
        setLoading(false);
      }
    }
  return (<>
    <div className="flex justify-center">
        <button className='px-5 py-2 bg-green-600 text-center m-2 text-white rounded-md hover:bg-green-400 hover:rounded-lg 
        hover:shadow-md transition duration-150 ease-in-out'
        onClick={()=>{setClicked(true)}}>
            Use it
        </button>
    </div>
    {clicked && (
      <div className="h-screen w-full z-10 bg-black/[0.7] top-0 left-0 fixed">
        <div className="form absolute bg-[#013237] text-[#EAF9E7] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 py-10
         px-14 rounded-md border-2 border-[#f9ce69] shadow-md shadow-[#f9ce69]">
          <form onSubmit={storeIt}>
            <div className="st m-2 text-lg">
              <label htmlFor="tripName" className="mt-1 text-center">Enter Trip Name:</label>
              <input type="text" name="tripName" id="tripName" className="text-black rounded-full px-4 outline-none
              hover:shadow-md hover:shadow-[#f9ce69]" 
              placeholder="Trip Name"
              value={tripName}
              onChange={(e)=>{setTripName(e.target.value)}}/>
            </div>
            <div className="sd m-2 text-lg">
              <label htmlFor="startDate" className="mt-1 text-center">Enter start date:</label>
              <input type="date" name="startDate" id="startDate" className="text-black rounded-full px-4 outline-none
              hover:shadow-md hover:shadow-[#f9ce69]"
              value={startDate}
              onChange={(e)=>{setStartDate(e.target.value)}} />
            </div>
            <div className="ed m-2 text-lg">
              <label htmlFor="endDate" className="mt-1 text-center">Enter end date:</label>
              <input type="date" name="endDate" id="endDate" className="text-black rounded-full px-4 outline-none
              hover:shadow-md hover:shadow-[#f9ce69]"
              value={endDate}
              onChange={(e)=>{setEndDate(e.target.value)}} />
            </div>
            <div className="p-2 flex justify-center">
              <button type="submit"
              className="m-2 px-6 py-2 rounded-full bg-[#4fadc0] text-center text-[#D9EFF7] 
              hover:shadow-md hover:shadow-[#fcdc73] border-2 border-[#fcdc73]">
                {loading?"Saving...":"Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  )
}

export default StoreItinerary