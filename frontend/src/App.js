import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React, { useEffect } from 'react';
import HomePage from './pages/homePage'
import CreateTaskPage from './pages/createTask';
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import EditTaskPage from './pages/editTask';
import './index.css';
import './App.css';
import Dashboard from './pages/dashboard';
import Task from './pages/task'
// import Task from './Components/Journal';
// import Update from './Components/Update.Journal';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('authToken'); // Remove expired token
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  return (
   

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
       <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditTaskPage />} /> 
        <Route path="/task/:id" element={<Task />} /> 

      </Routes>
    </Router>

  );

}

export default App;