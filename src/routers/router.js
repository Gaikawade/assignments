const express = require('express');
const { signup, signin } = require('../controllers/adminController');
const { addStudent, updateMarks, getStudent } = require('../controllers/studentController');
const { authentication } = require('../middlewares/auth');
const { userValidator, validate, signInValidator, studentValidation } = require('../middlewares/validator');
const router = express.Router();

router.post('/signup', userValidator, validate, signup);
router.post('/signin', signInValidator, validate,signin);
router.post('/add-student', authentication, studentValidation, validate, addStudent);
router.put('/update-marks', authentication, updateMarks);
router.get('/get-student/:id', getStudent);

module.exports = router;