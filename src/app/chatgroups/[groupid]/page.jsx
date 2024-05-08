'use client'
import React from "react";
import axios from "axios";

const page = ({ params }) => {
  const [chats,setChats] = React.useState([]);
  const [chatData,setChatData] = React.useState({});
  const [previousChatData,setPreviousChatData] = React.useState("");
  const [display,setDisplay] = React.useState(false);
  const [userName,setUserName] = React.useState("");
  const [message,setMessage] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [check,setCheck] = React.useState(false);
  const [fetching,setFetching] = React.useState(true);
  async function getChats(){
    // const eventSource = new EventSource(`/api/chatBox/getChats?groupId=${params.groupid}`);
    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setChatData(data);
    //   setChats(data.chats);
    // };
    // return eventSource;
    try {
      const resp = await axios.get('/api/chatBox/getChats',{
          params:{
              groupId:params.groupid,
          }
      });
      const newChatData = resp.data.resp;

      if (JSON.stringify(newChatData) !== JSON.stringify(previousChatData)) {
        //console.log(newChatData);
        setChatData(newChatData);
        setChats(newChatData.chats);
        setPreviousChatData(newChatData);
      }
      
      if(!check){
        const isLeader = JSON.parse(localStorage.getItem('user'));
        // const isLeader = document.cookie.split(';').some(cookie => cookie.trim().startsWith('token='));
        console.log(isLeader);
        if(isLeader){
          console.log(JSON.stringify(isLeader).length);
          setUserName(newChatData.members.at(0));
          setDisplay(true);
          setCheck(true);
        }
        setFetching(false);
      }
      // console.log(resp.data.resp);
      // setChatData(resp.data.resp);
      // setChats(resp.data.resp.chats);

    } catch (error) {
        console.log(error.message);
    } finally{
      setCheck(true);
    }
  }
  const sendMessage = ()=>{
    try {
      setLoading(true)
      const groupId = params.groupid;
      const resp = axios.post('/api/chatBox/sendMessage',{groupId,userName,message})
      console.log(resp.data);
      setMessage("");
    } catch (error) {
      console.log(error.message);
    } finally{
      setLoading(false);
    }
  }
  React.useEffect(()=>{
    // const eventSource = getChats();
    // return () => {
    //   eventSource.close();
    // };
    getChats();
    
  },[])
  React.useEffect(() => {
    const intervalId = setInterval(()=>getChats(), 5000);
    return () => clearInterval(intervalId);
  }, [previousChatData]);
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
      {!display && (
        // <>
        <div className="h-screen w-full z-10 bg-black/[0.7] top-0 left-0 fixed">
          <div className="form absolute bg-[#013237] text-[#EAF9E7] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 py-10
            px-14 rounded-md border-2 border-[#f9ce69] shadow-md shadow-[#f9ce69]">
            <form onSubmit={()=>{setDisplay(true)}}>
              <div className="st m-2">
                <label htmlFor="userName" className="mt-1 text-center">Enter Your Name:</label>
                <input type="text" name="userName" id="userName" className="text-black rounded-full py-2 px-4 outline-none
                hover:shadow-md hover:shadow-[#f9ce69]" 
                placeholder="Name"
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}/>
              </div>
              <div className="p-2 flex justify-center">
                <button type="submit"
                className="m-2 px-6 py-2 rounded-full bg-[#4fadc0] text-center text-[#D9EFF7] 
                hover:shadow-md hover:shadow-[#fcdc73] border-2 border-[#fcdc73]">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      // </>
      )}
      <div className="box absolute left-1/2 -translate-x-1/2 w-1/2 border-x-2 border-[#f6e8df]">
        <div className="heading p-5 bg-[#fcdc73] rounded-t-md">
          <h1 className="text-center text-lg text-[#193948] font-bold">
            {chatData.groupName}
          </h1>
        </div>
        <div className="chats bg-gray-100 h-[81vh] overflow-auto">
          {chats.length > 0 ? (
            <>
              {chats.map((chat, index) => {
                if(chat.sender=='System'){
                  return (
                    <div className="flex m-1 justify-center" key={index}>
                      <div className="px-3 py-2 bg-gray-200 border-b border-gray-300 text-lg text-center mt-5 rounded-full">
                        {chat.message}  
                      </div>
                    </div>
                  );
                }
                else if(chat.sender==userName){
                  return (
                    <div className="flex m-1 justify-end" key={index}>
                      <div className="px-4 py-2 bg-[#4fadc0] border-b border-gray-300 rounded-b-lg rounded-tl-lg
                       text-white">
                        {chat.message}
                      </div>
                    </div>
                  );
                }
                else{
                  return (
                    <div className="flex m-1 justify-start" key={index}>
                      <div className="px-4 py-2 bg-[#193948] border-b border-gray-300 rounded-b-lg rounded-tr-lg
                       text-white">
                        <p className="text-xs text-left text-[#e76268]">{chat.sender}</p> 
                        {chat.message}
                      </div>
                    </div>
                  );
                }
              })}
            </>
          ) : (
            <div className="p-5 text-center text-lg">Nothing Here</div>
          )}
        </div>
        <div className="sendMessage text-center bg-[#eaf9e7] rounded-b-md">
          <input type="text" name="message" id="message" className="text-black rounded-full py-2 px-4 outline-none
                hover:shadow-md hover:shadow-[#f9ce69] w-3/4" 
                placeholder="Message"
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}/>
          <button
            className="m-3 p-2 rounded-3xl bg-[#193948] text-white text-sm shadow-sm hover:shadow-md 
            hover:shadow-[#193948] hover:bg-[#9bbbfc]"
            onClick={sendMessage}>
            {/* {loading?"Sending":"Send"} */}
            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" 
            version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
              <title>send</title>
              <path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
