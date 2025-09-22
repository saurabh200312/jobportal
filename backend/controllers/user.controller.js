import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// ✅ Register (formerly createUser)
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phonenumber, role } = req.body;

    if (!fullname || !email || !password || !phonenumber || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: fullname,
      email,
      password: passwordHash,
      phonenumber,
      role,
    });

    await newUser .save();

    res.status(201).json({ message: "User created successfully", success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", success: false, error });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // role remove

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };

    res.status(200)
      .cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user: userData,
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", success: false, error });
  }
};


// ✅ Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie('token')
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Error logging out", success: false, error });
  }
};

// ✅ Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user; // from middleware
    const { name, email, phonenumber, bio, skills } = req.body;

    if (!name || !email || !phonenumber) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.name = name;
    user.email = email;
    user.phonenumber = phonenumber;
    user.profile.bio = bio;
    user.profile.skills = skills.split(',');

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phonenumber: user.phonenumber,
        profile: user.profile,
      }
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", success: false, error });
  }
};
