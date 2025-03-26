const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
exports.signup = async (req, res) => {
  try {
 console.log('Received data:', req.body);

    const {  email, password } = req.body;

    // Check for missing fields
    if (!( email && password)) {
      return res.status(401).send("Please fill all the required fields");

    }

    const existUser = await User.findOne({ email, })
    if (existUser) {
      return res.status(400).send("User already registered with this email");
    }



     console.log("Email is unique, proceeding to password encryption...");
    // Password encryption
    const encryptPassword = await bcrypt.hash(password, 10);
    console.log('Encrypted Password:', encryptPassword);
    
  
    // Save data in User collection

    const user = new User({
      email,
      password: encryptPassword,
      
    });

    await user.save();
   

    // Respond with success
    res.status(201).send("Registered successfully. ");

   } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("There was an error during signup.");
  }
};

  ;


    // const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET, { expiresIn: "2h" });

    // res.status(200).send("Email verified successfully and account created.");
  
// Login logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('Email and password are required');
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET, { expiresIn: '2h' });
    user.password = undefined; // Remove password from the response
    user.token = token;

    // Set token as a cookie and send response
    const options = {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Required for cross-site cookies

    };

    return res.status(200).cookie('token', token, options).json({
      success: true,
      token,
      user,
      message: 'Logged in successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("There was an error during login.");
  }
};


// Dashboard logic (protected route)
exports.dashboard = (req, res) => {
  res.send("Welcome to the dashboard!");
};