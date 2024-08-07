require("dotenv").config();

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await User.login(email, password);
    const token = createToken(response._id);
    res.status(200).json({ email, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// register user

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);

    // ** After creating and validating the user we want to send a token to the user **
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser };
