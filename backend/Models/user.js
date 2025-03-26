const mongoose = require('mongoose');

// Creating schema for user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required:false,
    // minlength: 8,
    default:"",
  }, 
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;