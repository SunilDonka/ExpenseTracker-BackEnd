const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true  // Ensure username is unique
  },
  firstname: {
    type: String,
    required: true  // No need for unique constraint on first name
  },
  lastname: {
    type: String,
    required: true  // No need for unique constraint on last name
  },
  email: {
    type: String,
    required: true  // No need for unique constraint on last name
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();  // If password is not modified, skip hashing
  }
  const salt = await bcrypt.genSalt(10);  // Generate salt
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password
  next();
});

// Method to compare entered password with hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
