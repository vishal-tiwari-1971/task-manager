import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userTask, setUserTask] = useState([]);
  const [incompletedTask,setIncompletedTasks]=useState([]);
  const [completedTask,setCompletedTasks]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");  // For storing error messages
  const navigate = useNavigate();

  // Function to filter tasks based on completion status
  const filterTasks = (tasks) => {
    setIncompletedTasks(tasks.filter(task => task.complition === false));
    setCompletedTasks(tasks.filter(task => task.complition === true));
  };
  
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
    if (!token) {
      navigate('/login');
    }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserTask(response.data);
        if(response.data==null){
          response.status(200)("create a Task to see here")
        }
        setIncompletedTasks(response.data.filter(task => task.complition === false));
  setCompletedTasks(response.data.filter(task => task.complition === true));

      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized access. Please log in.");
        } else {
          setError("An error occurred while fetching your taskss.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);
  
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task ?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You need to log in or sign up to continue.");
      return;
    }

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/task/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove the deleted task from the UI
        setUserTask((prevTasks) => {
          const updatedTasks = prevTasks.filter((task) => task._id !== id);
          // Filter tasks again for incompleted and completed tasks
          filterTasks(updatedTasks);
          return updatedTasks;
        });
      } else {
        setError("An error occurred while deleting the task.");
      }
    } catch (error) {
      setError("An error occurred while deleting the task.");
    }
  };

  const handleComplete = async (id) => {
    const confirmComplete = window.confirm("Are you sure to mark complete this task ?");
    if (!confirmComplete) return;

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You need to log in or sign up to continue.");
      return;
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/task/edit/${id}`,{complition: true}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      if (response.status === 200) {
         // Update userTask (to reflect the updated task)
         setUserTask(prevTasks => {
          const updatedTasks = prevTasks.map(task =>
            task._id === id ? { ...task, complition: true } : task
          );
          filterTasks(updatedTasks); // Re-filter tasks after the update
          return updatedTasks;
        });
      }
     
    } catch (error) {
      setError("An error occurred while completing the task.");
    }
  };

  return (
    <div className="bg-gray-900 text-black bg:text-white">
     
      <div className="dashboard-container p-6">
      
     <section className="bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white text-center">Your Task Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">Incomplete tasks</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {incompletedTask.map((task) => (
            <div
              className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col"
              key={task._id}
            >
             
              <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white">
               <Link to={`/task/${task._id}`}> {task.title}</Link>
              </h3>
              <p className="text-gray-600 mb-2 text-left line-clamp-2 dark:text-white">
              {task.description}
              </p>
              <div className="flex space-x-2 mt-4">
                <Link to={`/edit/${task._id}`}>
                  <button className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800">
                    Edit
                  </button>
                </Link>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
                  onClick={() => handleComplete(task._id)}
                >
                  Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">Completed tasks</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {completedTask.map((task) => (
            <div
              className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col"
              key={task._id}
            >
             
              <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white">
                {task.title}
              </h3>
              <p className="text-gray-600 mb-2 text-left line-clamp-2 dark:text-white">
              { task.description}
              </p>
              <div className='flex justify-center  space-x-2 mt-4'><button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
     <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link
                to="/create"
                className="inline-flex  items-center px-5 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Create a Task
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
              </div>
      
      </div>
    </div>
  );
} ;

export default Dashboard;