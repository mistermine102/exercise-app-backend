const mongoose = require('mongoose')

const exercisesGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  exercises: [
    {
      order: Number,
      sets: Number,
      reps: Number,
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    },
  ],
})

const ExercisesGroup = mongoose.model('ExercisesGroup', exercisesGroupSchema)

module.exports = ExercisesGroup
