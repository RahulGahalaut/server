import User from '../models/user-model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId }, { password: 0, _id: 0 });
    res.status(200).json({ user: user })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "thisismysecret"); //process.env.JWT_SECRET

    res.status(200).json({ token: token, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
export const signupUser = async (req, res) => {
  try {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    // Check if user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ username: username, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || "thisismysecret"); //process.env.JWT_SECRET

    res.status(201).json({ token: token, userId: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

