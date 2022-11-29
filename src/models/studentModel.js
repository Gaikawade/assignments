const mongoose = require("mongoose");
const objectId = mongoose.type.Schema.ObjectId;

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    subject: {
      type: [ String ],
      required: true,
      trim: true,
    },
    marks: {
      type: [ Number ],
      required: true,
      trim: true
    },
    admin: {
      type: objectId,
      ref: 'Admin',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

//neeraj