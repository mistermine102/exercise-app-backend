const Exercise = require('../models/Exercise')
const ExercisesGroup = require('../models/ExercisesGroup')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find()

    res.json({ message: 'Exercises fetched.', exercises })
  } catch (error) {
    next(error)
  }
}

exports.createExercise = async (req, res, next) => {
  try {
    const { name, description, imgUrl, difficulty, targetMuscles } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const error = new Error('Validation failed')
      error.errors = errors.array()
      error.statusCode = 422
      throw error
    }

    const exercise = new Exercise({
      name,
      description,
      imgUrl,
      difficulty,
      targetMuscles,
    })
    await exercise.save()

    res.json({ message: 'Exercise created' })
  } catch (error) {
    next(error)
  }
}

exports.removeExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.body
    await Exercise.findByIdAndDelete(exerciseId)

    const cursor = await ExercisesGroup.find().cursor()

    const bulkOps = []
    let doc
    while ((doc = await cursor.next())) {
      const exercises = doc.exercises.filter(exercise => !exercise.exercise.equals(exerciseId))
      bulkOps.push({
        updateOne: {
          filter: { 'exercises.exercise': new mongoose.Types.ObjectId(exerciseId) },
          update: { $set: { exercises } },
        },
      })
      if (bulkOps.length === 1000) {
        ExercisesGroup.collection.bulkWrite(bulkOps)
        bulkOps = []
      }
    }
    if (bulkOps.length) {
      ExercisesGroup.collection.bulkWrite(bulkOps)
    }

    res.json({ message: 'Exercise removed.' })
  } catch (error) {
    next(error)
  }
}

