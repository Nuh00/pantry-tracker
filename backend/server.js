// This is the entry file to aceess the server
require("dotenv").config(); // This is to access the .env file
// 1. install package.json     npm init -y
// 2. install express           npm install express
// 3. install nodemon         npm install nodemon --save-dev
//     - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const pantryRoutes = require("./routes/pantry");
const mongoose = require("mongoose");
// mongoose is a package that helps us to connect to the database

// 3. create an express app
const app = express();

// middleware

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pantry", pantryRoutes);

// Saying only use the workoutRoutes when the url is /api/workouts etc

// connect to the database
// Its asynchronous so we use .then and .catch

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to the database and listening on port 4000");
    });
  })
  .catch((err) => console.log(err));
// We dont want to listen to the port until weve connected to the database
// Listen to the port only once weve connected to the database
