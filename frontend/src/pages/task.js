// JournalPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Task=()=> {
  const { id } = useParams();
  console.log("Task ID:", id);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific task by ID from your backend API
    const getTask = async () => {
      try {
        

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/single/${id}`);

        console.log("data is : ",response.data)
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    getTask();
  }, [id]);


  if (!task) return <div>Task not found</div>;

  return (
   
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
         
          <div className="container mx-auto px-4 py-8">
            <h1 className='text-3xl text-white text-center font-semibold'>Task</h1>
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
              <h1 className="text-3xl font-bold  text-white text-center mb-4">{task.title}</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{task.description}</p>
              
            </div>
          </div>
        </div>      
  );
}

export default Task;