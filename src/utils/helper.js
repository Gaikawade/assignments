exports.subjectValidation = (subject) => {
    const listedSubjects = ["English", "Hindi", "Maths", "Science", "Social"];
    const result = subject
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((m) => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase());

    //*Instead of for-Loop we can use every-some functions
    let checkSubjects = result.every((x) => listedSubjects.some((y) => x == y));
    if (!checkSubjects) {
        return false;
    }

    return result;
};

exports.marksValidator = (res, marks) => {
    let result = marks
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((x) => +x);

    let checkMarks = result.every((x) => {
        return !isNaN(x);
    });

    if (!checkMarks) {
        return false
    }

    return result;
};
