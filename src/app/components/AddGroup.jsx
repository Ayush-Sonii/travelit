import React from 'react'
import axios from 'axios';

function AddGroup({setClicked}) {
    const [groupName,setGroupName] = React.useState("");
    const [member,setMember] = React.useState("");
    const [members,setMembers] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    // const router = useRouter();
    // React.useEffect(()=>{
    //   window.scroll(0,0);
    // },[clicked])
    const addMember = ()=>{
      setMembers([...members,member]);
      setMember('');
    }
    const handleRemovePerson = (index) => {
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
    };
    const createGroup = async (e)=>{
      e.preventDefault();
      try {
        setLoading(true)
        const userDetails = JSON.parse(localStorage.getItem('user'));
        const userEmail = userDetails.email;
        const resp = await axios.post('/api/chatBox/createGroup',{userEmail,groupName,members});
        console.log("Group Created",resp.data);
        setClicked(false);
      } catch (error) {
        console.log(error.message);
      }
      finally{
        setLoading(false);
      }
    }
  return (<>
    <div className="h-screen w-full z-10 bg-black/[0.7] top-0 left-0 fixed">
        <div className="form absolute bg-[#013237] text-[#EAF9E7] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 py-10
         px-14 rounded-md border-2 border-[#f9ce69] shadow-md shadow-[#f9ce69]">
          <form onSubmit={createGroup}>
            <div className="st m-2">
              <label htmlFor="groupName" className="mt-1 text-center">Enter Group Name:</label>
              <input type="text" name="groupName" id="groupName" className="text-black rounded-full py-2 px-4 outline-none
              hover:shadow-md hover:shadow-[#f9ce69]" 
              placeholder="Group Name"
              value={groupName}
              onChange={(e)=>{setGroupName(e.target.value)}}/>
            </div>
            <div className="sd m-2">
              <label htmlFor="member" className="mt-1 text-center">Enter group member's name:</label>
              <input type="text" name="member" id="member" className="text-black rounded-full py-2 px-4 outline-none
              hover:shadow-md hover:shadow-[#f9ce69]"
              placeholder="Member's Name"
              value={member}
              onChange={(e)=>{setMember(e.target.value)}} />
            </div>
            <div className="m-2 flex justify-end">
              <button className='m-2 px-3 py-1 rounded-full bg-[#4fadc0] text-center text-[#D9EFF7] 
              hover:shadow-md hover:shadow-[#fcdc73] border-2 border-[#fcdc73]'
              type='button'
              onClick={addMember}>
                Add Member
              </button>
            </div>
            <ul className="mb-4 h-20 overflow-auto flex flex-col">
              {members.map((person, index) => (
                <li key={index} className="mb-2 items-center">
                  <span>{person}</span>
                  <button
                    type='button'
                    onClick={() => handleRemovePerson(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-2 flex justify-center">
              <button type="submit"
              className="m-2 px-6 py-2 rounded-full bg-[#4fadc0] text-center text-[#D9EFF7] 
              hover:shadow-md hover:shadow-[#fcdc73] border-2 border-[#fcdc73]">
                {loading?"Creating...":"Create Group"}
              </button>
            </div>
          </form>
        </div>
      </div>
  </>
  )
}

export default AddGroup