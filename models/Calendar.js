const mongoose = require("mongoose")

const calendarSchema = new mongoose.Schema({
    days: [{
        dayName: String,
        dayIndex: Number,
        exercisesGroup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExercisesGroup"
        }
    }]
})

const Calendar = mongoose.model("Calendar", calendarSchema)

module.exports = Calendar