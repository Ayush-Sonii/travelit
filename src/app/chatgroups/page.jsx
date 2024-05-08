'use client'
import axios from 'axios'
import React from 'react'
import Link from 'next/link'
import AddGroup from '@/app/components/AddGroup'
import Nav from '@/app/components/nav'

function groupChat() {
    const [groups,setGroups] = React.useState([]);
    const [clicked,setClicked] = React.useState(false);
    async function getGroups(){
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const resp = await axios.get('/api/chatBox/getGroups',{
                params:{
                    email:user.email,
                }
            });
            setGroups(resp.data.resp);

        } catch (error) {
            console.log(error.data);
        }
    }
    React.useEffect(()=>{
        getGroups();
        window.scroll(0,0);
    },[clicked])
  return (<>
    <Nav isLoggedIn={true}/>
    <div className="box absolute left-1/2 -translate-x-1/2 w-1/2 border-x-2 border-[#f6e8df] top-24">
        <div className="heading p-5 bg-[#fcdc73] rounded-t-md">
            <h1 className='text-center text-lg text-[#193948] font-bold'>Chat Groups</h1>
        </div>
        <div className="groupList bg-gray-100 h-[66vh] overflow-auto">
            {/* {groups.forEach(group => {
                        <div className="p-2 bg-gray-200 border-b border-gray-300 text-lg">
                        No active groups
                        </div>
                    })} */}
            {groups.length>0?<>
                {groups.map((group,index) => {
                    const url = `/chatgroups/${group.groupId}`;
                    return(
                        <div key={index} className="p-2 bg-gray-200 border-b border-gray-300 text-lg">
                            {/* This one */}
                            <Link href={url}>{group.groupName}</Link>
                        </div>
                    )
                })}
                </>
                :
                <div className="p-5 text-center text-lg">
                    No active groups
                </div>
            } 
        </div>
        <div className="addGroup text-center bg-[#eaf9e7] rounded-b-md">
            <button className='m-3 p-3 rounded-3xl bg-[#193948] text-white text-sm w-3/4 shadow-sm hover:shadow-md 
            hover:shadow-[#193948] hover:bg-[#9bbbfc]'
            onClick={()=>{setClicked(true)}}>
                Add Group
            </button>
        </div>
        {clicked && <AddGroup setClicked={setClicked}/>}
    </div>
  </>
  )
}

export default groupChat