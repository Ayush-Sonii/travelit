'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import Nav from '@/app/components/nav'

const CommonRoom = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [roomLink, setRoomLink] = useState('');
  const [roomId,setRoomId] = useState('');
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  // Effect to load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    const newRoomId = Math.random().toString(36).substring(2, 15);
    setRoomId(newRoomId);
  }, []);

  const saveList = async ()=>{
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userEmail = user.email;
      const resp = await axios.post('/api/taskList/saveTask',{roomId,userEmail,tasks});
      console.log(resp.data);
      // router.push(`/todo/${newRoomId}`);
    } catch (error) {
      console.log(error.message);
    } finally{
      setLoading(false);
    }
  }

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = { id: Date.now(), text: taskInput };
      const newTasks = [...tasks, newTask];
      //console.log(newTasks);
      setTasks(newTasks); // Update state
      localStorage.setItem('tasks', JSON.stringify(newTasks)); // Update localStorage
      setTaskInput(''); // Reset input field
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks); // Update state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
  };

  const generateLink = () => {
    // This is a mock function for generating a room link
    const newLink = `http://localhost:3000/todo/${roomId}`;
    setRoomLink(newLink); // Set the new room link
  };

  return (
    <>
      <Nav isLoggedIn={true}/>
      <div style={{ maxWidth: '1024px', margin: '90px auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '40px' }}>Common Room</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)} 
            placeholder="Add a new task" 
            style={{ padding: '10px', marginRight: '10px', border: '1px solid grey', width: '80%', marginTop: '40px' }}
          />
          <button onClick={addTask} style={{ padding: '10px', cursor: 'pointer', color: 'white', background: 'black', marginTop: '40px', borderRadius: '7px' }}>Add Task</button>
        </div>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', display:'block' }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
              {task.text}
              <button onClick={() => removeTask(task.id)} style={{ marginLeft: '20px', cursor: 'pointer', color: 'white', background: 'red', borderRadius: '50%', width: '25px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>X</button>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px' }}>
          <button onClick={saveList} 
          style={{ padding: '10px', cursor: 'pointer', background: 'grey', borderRadius: '7px', color: 'whitesmoke' }}>
            {loading?"Saving...":"Save Task List"}
          </button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button onClick={generateLink} style={{ padding: '10px', cursor: 'pointer', background: 'grey', borderRadius: '7px', color: 'whitesmoke' }}>Generate Invite Link</button>
          {roomLink && <div style={{ marginTop: '20px' }}><p>Share this link to invite others:</p>
          <a href={roomLink} target="_blank" rel="noopener noreferrer">{roomLink}</a></div>}
        </div>
      </div>
    </>
  );
};

export default CommonRoom;
