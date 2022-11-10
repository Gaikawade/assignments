const express = require('express');
const { signup, signin } = require('../controllers/adminController');
const { addMarks } = require('../controllers/studentController');
const { userValidator, validate, signInValidator } = require('../middlewares/validator');
const router = express.Router();

router.post('/signup', userValidator, validate, signup);
router.post('/signin', signInValidator, validate,signin);
router.post('/add-marks', addMarks);

module.exports = router;