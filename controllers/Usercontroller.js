const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// Register new user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register new user
exports.registerUser = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ username, firstname, lastname, email, password });
    await user.save();

    // Generate token after user creation
    const token = generateToken(user._id);

    // Send response with user data and token
    res.status(201).json({
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// User sign-in with email and password
// authController.js (Backend)
// User sign-in with email and password
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Check if the user exists by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Step 2: Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Step 3: Generate the JWT token and return it with user info
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
      message: "Login Successfully",
      user: { username: user.username },  // Include the 'user' object in the response
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
