const student = require("../models/studentModel");
const { marksValidator, subjectValidation } = require("../utils/helper");
const { sendError } = require("../utils/sendError");

const listedSubjects = ["English", "Hindi", "Maths", "Science", "Social"];

const addMarks = async (req, res) => {
    let { name, id, subject, marks } = req.body;

    let stuDoc = await student.findOne({ id });
    if (stuDoc) {
        return sendError(
            res,
            "You can not use the same id for different students"
        );
    }

    subject = subjectValidation(subject);
    if (!subject) {
        return sendError(
            res,
            `If you are entering more than one subject, Please add a space between them & we have ${listedSubjects} subjects only`
        );
    }

    marks = marksValidator(res, marks);
    if (!marks) {
        return sendError(res, "Marks must be a number and seperate by a space");
    }

    const newStudent = await student.create({ name, id, subject, marks });

    res.status(201).json({ newStudent });
};

const updateMarks = async (req, res) => {
    let { id, subject, marks } = req.body;

    const stuDoc = await student.findOne({id});
    if(!stuDoc) {
      return sendError(res, `No student found with that ${id}`, 404);
    }

    subject = subjectValidation(subject);
    if (!subject) {
        return sendError(
            res,
            `If you are entering more than one subject, Please add a space between them & we have ${listedSubjects} subjects only`
        );
    }

    marks = marksValidator(res, marks);
    if (!marks) {
        return sendError(res, "Marks must be a number and seperate by a space");
    }


};

module.exports = { addMarks, updateMarks };
