const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating our own static method to hash user password before saving to mongoDB
userSchema.statics.register = async function (email, password) {
  // ** Check if the email and password are valid before anything **
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  // ** Check if the email is valid **
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  // ** Check if the password is valid **
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  //if user with the email already exists it will have a value
  // Else it will be null
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
    // we dont have access to res so we cant send a response
    // later when we have access to res we can catch this error and send a res
  }
  // !! Instlall bcrypt so we can hash the password
  // salt is a random string that is added to the password before hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ** now we can create user with hashed password and email **
  const user = await this.create({ email, password: hashedPassword });
  return user;
};

// Creating our own static method to login user
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Email not found");
  }

  // ** Compare the password **
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
