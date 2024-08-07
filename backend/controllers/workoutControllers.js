const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single workout

const getWorkout = async (req, res) => {
  console.log("i see you ");
  try {
    const { id } = req.params;
    // Check if the id is valid in terms of mongoose
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No workout with that id");

    const workout = await Workout.findById(id);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Create a new workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // IF we are missing any of the fields, we dont even want to try to create a new workout
  // Instead we will send a response to the client to let them know what fields are missing
  // Including the list of missing fields in the response will help the client to know what they need to fix

  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields", emptyFields });
  }

  // Adding doc to the database
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      // creating a new workout based on the "Workout" model
      // creating a new model is "asynchronous" so we use "await"
      title,
      reps,
      load,
      user_id,
    });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No workout with that id");

    const workout = await Workout.findOneAndDelete(id);

    if (!workout) return res.status(404).send("No workout with that id");

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a workout

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No workout with that id");

    const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

    if (!workout) return res.status(404).send("No workout with that id");

    res.status(200).json({ message: "Workout updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
