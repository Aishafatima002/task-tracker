import jwt from "jsonwebtoken";
import { User } from "../models/User.mjs";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ _id: user._id, username: user.username, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({ _id: user._id, username: user.username, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export default { registerUser, loginUser };