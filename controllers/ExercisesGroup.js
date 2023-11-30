const ExercisesGroup = require('../models/ExercisesGroup')
const { validationResult } = require('express-validator')
const mongoose =  require("mongoose")

exports.getExercisesGroups = async (req, res, next) => {
  try {
    const exercisesGroups = await ExercisesGroup.find().populate('exercises.exercise')

    res.json({ message: 'Exercises groups fetched.', exercisesGroups })
  } catch (error) {
    next(error)
  }
}

exports.createExercisesGroup = async (req, res, next) => {
  try {
    const { name, exercises } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const error = new Error('Validation failed')
      error.errors = errors.array()
      error.statusCode = 422
      throw error
    }

    const newExercises = exercises.map(exercise => ({
      ...exercise,
      exercise: exercise.exercise._id,
    }))
    const exercisesGroup = new ExercisesGroup({
      name,
      exercises: newExercises,
    })
    await exercisesGroup.save()

    res.json({ message: 'Exercises group created' })
  } catch (error) {
    next(error)
  }
}

exports.removeExercisesGroup = async (req, res, next) => {
  try {
    const { exercisesGroupId } = req.body
    await ExercisesGroup.findByIdAndDelete(exercisesGroupId)
    res.json({ message: 'Exercises group removed.' })
  } catch (error) {
    next(error)
  }
}

exports.editExercisesGroup = async (req, res, next) => {
  try {
    const { _id, name, exercises } = req.body

    const newExercises = exercises.map(exercise => ({
      ...exercise,
      exercise: new mongoose.Types.ObjectId(exercise.exercise._id)
    }))

    await ExercisesGroup.findByIdAndUpdate(_id, { name, exercises: newExercises })

    res.json({ message: 'Exercises group edited succesfully.' })
  } catch (error) {
    next(error)
  }
}
