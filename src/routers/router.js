const express = require('express');
const { signup, signin } = require('../controllers/adminController');
const { userValidator, validate, signInValidator } = require('../middlewares/validator');
const router = express.Router();

router.post('/signup', userValidator, validate, signup);
router.post('/signin', signInValidator, validate,signin)

module.exports = router;