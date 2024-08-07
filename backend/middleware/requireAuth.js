const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Verify if the user is authenticated

  // Get the jwt token from the headers
  const { authorization } = req.headers;

  // Check if the token is present
  if (!authorization) {
    res.status(401).json({ error: "You must be logged in" });

    // Extract the token from the header
    // It looks like this:   "Bearer aoefjwafjebgwpt3fwa9p3f"
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "You must be logged ins" });
  }
};

module.exports = requireAuth;
