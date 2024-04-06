const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');
require('dotenv').config();



router.post('/register', async (req, res) => {
    try {
      const {  email, password } = req.body;
   
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
    
        return res.status(409).json({ message: 'User already exists!' });
      }
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        email,
        password: hashedPassword,
      
      });
  
      await newUser.save();
  
     
      res.status(200).json({ message: 'User registered successfully!', user: newUser });
  
    } catch (err) {
     
      res.status(500).json({ message: 'Registration failed!', error: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
  
        return res.status(409).json({ message: 'Email is not found, Please Register!' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
       
        return res.status(400).json({ message: 'Password is incorrect' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
      delete user.password;
  
     
      res.status(200).json({
        token,
        user,
        message: 'Login successful! Redirecting to Home page.',
      });
    } catch (err) {
      
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = router;