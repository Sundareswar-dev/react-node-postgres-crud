require('dotenv').config();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const pool = require('../config/db');
const jwt=require("jsonwebtoken");


exports.loginCredentials = async (req, res) => {
  const {email,password}=req.body
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log(error,"error., controller")
    res.status(500).json({ error: "Login failed" });
  }
};

exports.signUpCredentials = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(email)
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUserCredentials(name, email,hashedPassword);
    res.status(201).json({ message: "User registered successfully!",token: process.env.JWT_SECRET });
  } catch (error) {
    res.status(500).json({ error: `Error registering user${error}` });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.getAll();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.getById(req.params.id);
  res.json(user);
};

exports.createUser = async (req, res) => {
  const { name, email, role, address, profile } = req.body;

  if (!name || !email || !role || !address || !profile) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.create(name, email, role, address, profile);
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user", message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  console.log(req.params.id, "req.params.id");
  const { name, email, role, address, profile } = req.body;
  const user = await User.update(
    req.params.id,
    name,
    email,
    role,
    profile,
    address
  );
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.delete(req.params.id);
  res.json({ message: "User deleted" });
};
