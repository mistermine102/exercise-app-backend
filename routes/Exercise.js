const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const exerciseCtrl = require('../controllers/Exercise')

router.get('/', exerciseCtrl.getExercises)
router.post('/', [
    body('name').not().isEmpty().withMessage("Name is required."),
    body('description').not().isEmpty().withMessage("Description is required."),
    body('difficulty').not().isEmpty().withMessage('Difficulty is required')
], exerciseCtrl.createExercise)
router.delete("/", exerciseCtrl.removeExercise)

module.exports = router
