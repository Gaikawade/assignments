const { sendError } = require("../utils/sendError");
const admin = require('../models/adminModel');
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  let { name, email, password } = req.body;

  let emailExists = await admin.findOne({email});
  if(emailExists){
    return sendError(res, 'Email already exists');
  }

  const newUser = new admin(req.body);
  await newUser.save();

  res.status(201).json({msg: 'Sign-Up Successfully', data: newUser});
}

const signin = async (req, res) =>{
  let {email, password} = req.body;

  let user = await admin.findOne({email: email});
  if(!user) return sendError(res, 'Email/Password is wrong');

  const matched = await user.comparePassword(password);
  if(!matched) return sendError(res, 'Email/Password is wrong');

  const token = jwt.sign(
    {userId : user._id},
    process.env.JWT_SECRET_KEY,
    {expiresIn: 60 * 1000}
  );

  res.status(200).json({msg: 'Sign-in successful', data: {userId: user._id, token: {token}}});
}

module.exports = {
  signup,
  signin
}