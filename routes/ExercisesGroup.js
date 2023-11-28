const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const exercisesGroupCtrl = require('../controllers/ExercisesGroup')

router.get('/', exercisesGroupCtrl.getExercisesGroups)
router.post('/', [
    body('name').not().isEmpty().withMessage("Name is required."),
], exercisesGroupCtrl.createExercisesGroup)
router.delete("/", exercisesGroupCtrl.removeExercisesGroup)

module.exports = router