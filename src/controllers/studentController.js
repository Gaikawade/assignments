const adminModel = require("../models/adminModel");
const student = require("../models/studentModel");
const { marksValidator, subjectValidation } = require("../utils/helper");
const { sendError } = require("../utils/sendError");

const listedSubjects = ["English", "Hindi", "Maths", "Science", "Social"];

const addStudent = async (req, res) => {
    let { name, id, subject, marks } = req.body;

    let adminDoc = await adminModel.findById(req.adminId);
    if (!adminDoc) {
        return sendError(res, "You are not an admin and you dont have access");
    } else if (adminDoc.isAdmin === false) {
        return sendError(res, "You dont have admin rights to access this page");
    }

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

    marks = marksValidator(marks);
    if (!marks) {
        return sendError(res, "Marks must be a number and seperate by a space");
    }

    if (subject.length !== marks.length) {
        return sendError(
            res,
            "Please add all marks for the subjects you are added, if you dont want to give marks them give 0"
        );
    }

    const newStudent = await student.create({ name, id, subject, marks });

    res.status(201).json({ newStudent });
};

const updateMarks = async (req, res) => {
    let { id, subject, marks } = req.body;

    let adminDoc = await adminModel.findById(req.adminId);
    if (!adminDoc) {
        return sendError(res, "You are not an admin and you dont have access");
    } else if (adminDoc.isAdmin === false) {
        return sendError(res, "You dont have admin rights to access this page");
    }

    const stuDoc = await student.findOne({ id });
    if (!stuDoc) {
        return sendError(res, `No student found with that ${id}`, 404);
    }

    subject = subjectValidation(subject);
    if (!subject) {
        return sendError(
            res,
            `If you are entering more than one subject, Please add a space between them & we have ${listedSubjects} subjects only`
        );
    }

    marks = marksValidator(marks);
    if (!marks) {
        return sendError(res, "Marks must be a number and seperate by a space");
    }

    if (subject.length !== marks.length) {
        return sendError(
            res,
            "Please add all marks for the subjects you are added, if you dont want to give marks them give 0"
        );
    }

    let check = subject.every((x) => stuDoc.subject.some((y) => x === y));
    if (check) {
        let index = subject.map((x) => stuDoc.subject.indexOf(x));
        for (let i = 0; i < index.length; i++) {
            stuDoc.marks[index[i]] += marks[i];
        }
        await stuDoc.save();
        res.status(200).json({ msg: "Marks updated", data: stuDoc });
    } else {
        subject.every((x) => stuDoc.subject.push(x));
        marks.every((x) => stuDoc.marks.push(x));
        await stuDoc.save();
        res.status(200).json({ msg: "Marks added", data: stuDoc });
    }
};

const getStudent = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return sendError(res, "Please enter a student ID");
    }

    const stuDoc = await student.findOne({ id });
    if (!stuDoc) {
        return sendError(res, "No student fount with that id", 404);
    }
    res.status(200).json({ msg: "student details", data: stuDoc });
};

module.exports = { addStudent, updateMarks, getStudent };
