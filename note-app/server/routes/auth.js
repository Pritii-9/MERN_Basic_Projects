import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/register', async (req, res) => {

    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) { // Check if user is truthy
        return res.status(401).json({ success: false, message: "User already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();
      return res.status(200).json({ success: true, message: "Account created successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error in adding user" });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) { // Check if user is truthy
        return res.status(401).json({ success: false, message: "User not exists" });
      }
      const checkPassword = bcrypt.compare(password,user.password);

      if(!checkPassword){
        return res.status(401).json({ success: false, message: "invalid credential" });
      }

      const token = jwt.sign({id:user._id},"secretkey123",{expiresIn: "55h"});

      return res.status(200).json({ success: true,token,user:{name:user.name}, message: "Logged in successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error in login server" });
    }
  });
  

export default router;