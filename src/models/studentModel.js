const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  marks: {
    type: Number,
    required: true,
    trim: true
  }
},{ timestamps: true } );

module.exports = mongoose.Model('Student', studentSchema);