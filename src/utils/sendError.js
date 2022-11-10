exports.sendError = (res, err, statusCode = 401) => {
    res.status(statusCode).json({ error: err.message || err});
};

exports.subjectValidation = (res, subject) => {
    const listedSubjects = ["English", "Hindi", "Maths", "Science", "Social"];
    const result = subject
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((m) => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase());
console.log(result);
    //*Instead of for-Loop we can use every-some functions
    let checkSubjects = result.every((x) =>
        listedSubjects.some((y) => x == y)
    );
    if (!checkSubjects) {
        return res.status(401).json({error: `If you are entering more than one subject, Please add a space between them & we have ${listedSubjects.join(", ")} subjects only`});
    }

    return result;
};

