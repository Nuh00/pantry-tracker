const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// !! These are all the routes we want to protect !!
router.use(requireAuth);

// Get all workouts
router.get("/", getWorkouts);

// Get one workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
