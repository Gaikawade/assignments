const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

adminSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

adminSchema.methods.comparePassword = async function(password){
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model('Admin', adminSchema);