import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [complition, setCompltion] = useState('false');
 const navigate = useNavigate();
 const { id } = useParams(); 

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check if token exists
    console.log('Auth Token:', token); // Debug log
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  const submitData = async () => {
   
    try {
      const taskData = {
        title: title,
        description: description,
        complition: complition,
      };

    console.log('Title:', title);
console.log('Description:', description);
console.log('Complition:', complition);

    
    
  

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/task/edit/${id}`, taskData, {

        headers: {
          withCredentials: true, // Ensures cookies are sent with the request
         'Content-Type': 'application/json', // Send data as JSON
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log(response);
      // Reset form fields
      setTitle('');
      setDescription('');
      setCompltion('false');
     
      navigate('/dashboard'); // Redirect to dashboard after submission
    } catch (error) {
      
      console.error('Error submitting data:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
  };



  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
    
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-5">
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="block w-full p-2.5 mt-2 text-sm border border-gray-300 rounded-lg bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            id="description"
            rows="7"
            className="block w-full p-2.5 mt-2 text-sm border border-gray-300 rounded-lg bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>

        {/* <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Visibility</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value)}
                className="form-radio appearance-none w-3 h-3 border border-gray-800 dark:border-gray-300 rounded-full checked:bg-gray-500 dark:checked:bg-gray-200 checked:border-transparent"
              />
              <span className='text-gray-800 dark:text-gray-200 font-semibold'>Private</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={(e) => setVisibility(e.target.value)}
                className="form-radio appearance-none w-3 h-3 border border-gray-800 dark:border-gray-300 rounded-full checked:bg-gray-500 dark:checked:bg-gray-200 checked:border-transparent"
              />
              <span className='text-gray-800 dark:text-gray-200 font-semibold'>Public</span>
            </label>
          </div>
        </div> */}

        <button
          type="submit"
          className="mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg py-2.5"
        >
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;