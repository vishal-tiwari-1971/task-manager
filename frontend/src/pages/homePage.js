import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <body className="bg-gray-900 h-screen flex justify-center items-center">
    <div className="text-center">
      <h1 className="font-extrabold tracking-tight leading-tight md:text-5xl xl:text-6xl text-white">
        Task Manager
      </h1>
      <p className="max-w-2xl mb-6 g:mb-8 md:text-lg lg:text-xl mt-4 text-gray-400">
        Signup or Login to start your personalised tasks.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/signup"
          className="inline-flex items-center px-5 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Signup
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center px-5 py-3 text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Login
        </Link>
      </div>
    </div>
  </body>
  

  );
};

export default HomePage;