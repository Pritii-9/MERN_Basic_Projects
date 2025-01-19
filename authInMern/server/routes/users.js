import express from 'express';
import { User, validate } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const generateToken = async (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: '1h',
  });
};

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(req.body.password);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    const token = await generateToken(newUser);

    res.status(201).send({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export const userRouter = router;
