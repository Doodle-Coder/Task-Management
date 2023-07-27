import express from 'express';
import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../model/userSchema.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT 
    const accessToken = jsonWebToken.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user' });
  }
});

export default router