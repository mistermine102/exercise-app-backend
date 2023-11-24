const Exercise = require("../models/Exercise")
const { validationResult } = require('express-validator')

exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find()

    res.json({ message: "Exercises fetched.", exercises })
  } catch (error) {
    next(error)
  }
}

exports.createExercise = async (req, res, next) => {
  try {
    const { name, description, imgUrl, difficulty, targetMuscles } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed")
      error.errors = errors.array()
      error.statusCode = 422
      throw error
    }

    const exercise = new Exercise({
      name,
      description,
      imgUrl,
      difficulty,
      targetMuscles
    })
    await exercise.save()

    res.json({ message: "Exercise created" })
  } catch (error) {
    next(error)
  }
}

exports.removeExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.body
    await Exercise.findByIdAndDelete(exerciseId)
    res.json({ message: "Exercise removed." })
  } catch (error) {
    next(error)
  }
}

exports.editExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.body

  } catch (error) {
    next(error)
  }

}
