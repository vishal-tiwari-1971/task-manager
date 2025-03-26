require("dotenv").config()
require("./Config/database").connect()
// const User=require('./Models/user')
// const Task=require('./Models/task')
const express = require('express')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser=require('cookie-parser')
// // custom middleware
const auth = require("./Middleware/auth")
const app = express()
const cors=require('cors')
// // to allow json format data 
app.use(express.json())
// // to get data from forms
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(cors({
  origin: process.env.FRONTEND_URL
  ,    // Allow this specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods,
  allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],  // Allow these headers
  credentials: true, // Allow cookies to be sent
  
}));
console.log(process.env.FRONTEND_URL);


// Configure CORS
// const corsOptions = {
//   origin: 'http://localhost:3000', // Allow this specific origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//   credentials: true, // Include cookies if needed
// };



app.get("/", (req, res) => {
  res.send("<h1>Welcome to Task Manager</h1> ") 
   });

app.use("/user", require("./Routes/userRoutes"))
app.use("/task", require("./Routes/taskRoutes"))

module.exports=app