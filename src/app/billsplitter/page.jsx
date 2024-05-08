'use client'
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

export default function Home() {
  const [peopleData, setPeopleData] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const handleAddPerson = () => {
    if (newPerson.trim() !== '') {
      setPeopleData([...peopleData, { name: newPerson, netAmount: 0 }]);
      setNewPerson('');
    }
  };

  const handleRemovePerson = (index) => {
    const updatedPeopleData = peopleData.filter((_, i) => i !== index);
    setPeopleData(updatedPeopleData);
  };

  const createBill = async ()=>{
    try {
      setLoading(true)
      const user = JSON.parse(localStorage.getItem("user"));
      const userEmail = user.email;
      const resp = await axios.post('/api/bills/initiate',{userEmail,peopleData})
      console.log(resp.data);
      router.push(`/billsplitter/${resp.data.savedBill.billId}`)
    } catch (error) {
      console.log(error.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

      <div className="p4 rounded-t shadow-md w-96 bg-[#3664f4]">
        <h1 className="text-3xl font-semibold m-4 text-center text-white">Bill Splitter</h1>
      </div>

      <div className="bg-white p-4 shadow-md w-96">
        <input
          type="text"
          placeholder="Enter person's name"
          className="w-full p-2 border rounded my-3"
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
        />
        <div className="m-2 flex justify-end">
          <button
            onClick={handleAddPerson}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Person
          </button>
        </div>
        <ul className="mb-4 h-20 overflow-auto flex flex-col">
          {peopleData.map((person, index) => (
            <li key={index} className="mb-2 flex items-center">
              <span>{person.name}</span>
              <button
                onClick={() => handleRemovePerson(index)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="p-2 flex justify-center">
          
        </div>
      </div>
      
      <div className="p4 rounded-b shadow-md w-96 bg-[#e85353] flex justify-center">
            <button
              type="button"
              onClick={createBill}
              className={`${loading?"bg-blue-600":"bg-blue-500"} m-3 text-white px-4 py-2 rounded hover:bg-blue-600
               disabled:bg-blue-200 disabled:cursor-not-allowed`}
              disabled={peopleData.length>0?"":"disabled"}
            >
              {loading?"Submiting...":"Submit"}
          </button>
      </div>
    </div> 
  );
}
