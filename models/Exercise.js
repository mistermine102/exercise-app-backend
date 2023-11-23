const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: false
    },
    difficulty: {
        type: Number,
        required: true
    },
    targetMuscles: [String]
})

const Exercise = mongoose.model("Exercise", exerciseSchema)

module.exports = Exercise