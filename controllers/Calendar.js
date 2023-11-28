const Calendar = require('../models/Calendar')

exports.getCalendar = async (req, res, next) => {
  try {
    const calendar = await Calendar.findOne().populate({
        path : 'days.exercisesGroup',
        populate : {
          path : 'exercises.exercise'
        }
      })

    const { days } = calendar

    res.json({ message: 'Calendar succesfully fetched.', days })
  } catch (error) {
    next(error)
  }
}

exports.selectGroup = async (req, res, next) => {
  try {
    const { exercisesGroupId, dayId } = req.body
    const calendar = await Calendar.findOne()

    const selectedDay = calendar.days.find(day => day._id.equals(dayId))
    selectedDay.exercisesGroup = exercisesGroupId

    await calendar.save()
    res.json({ message: 'Exercise group selected' })
  } catch (error) {
    next(error)
  }
}
