require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const bodyParserErrorHandler = require('express-body-parser-error-handler')

const app = express()

app.use(express.json())

//routes
const exerciseRoutes = require('./routes/Exercise')
const exercisesGroupRoutes = require('./routes/ExercisesGroup')
const calendarRoutes = require('./routes/Calendar')

app.use('/exercise', exerciseRoutes)
app.use("/exercise/group", exercisesGroupRoutes)
app.use("/calendar", calendarRoutes)

//error handling middleware
app.use((error, req, res, next) => {
  console.log(error)
  const { statusCode = 500, message, errors = [] } = error
  res.status(statusCode).json({ message, errors })
})

app.listen(8000, () => {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to the db')
  })
})
