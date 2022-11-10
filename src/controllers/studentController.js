const student = require("../models/studentModel");
const { sendError, subjectValidation } = require("../utils/sendError");

const addMarks = async (req, res) => {
    let { name, id, subject, marks } = req.body;

    let stuDoc = await student.findOne({ id });
    if (stuDoc) {
        return sendError(
            res,
            "You can not use the same id for different students");
    }

    subject = subjectValidation(res, subject);

    marks = marks
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((x) => +x);

    let checkMarks = marks.every((x) => {
        return !isNaN(x);
    });

    if (!checkMarks) {
        return sendError(res, "Marks must be a number and seperate by a space");
    }

    const newStudent = await student.create({ name, id, subject, marks });

    res.status(201).json({ newStudent });
};

const updateMarks = async (req, res) => {
  let {id, subject, marks} = req.body;

  subject = subjectValidation(subject);

}

module.exports = { addMarks };