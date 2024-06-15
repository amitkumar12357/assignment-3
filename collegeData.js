const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;
let isInitialized = false;

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/courses.json', 'utf8', (err, courseData) => {
            if (err) {
                reject("Unable to load courses");
                return;
            }

            fs.readFile('./data/students.json', 'utf8', (err, studentData) => {
                if (err) {
                    reject("Unable to load students");
                    return;
                }

                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                isInitialized = true;
                resolve();
            });
        });
    });
}

// Check if initialized before executing other functions
function checkInitialization() {
    return new Promise((resolve, reject) => {
        if (isInitialized) {
            resolve();
        } else {
            reject("Data is not initialized");
        }
    });
}

module.exports.getAllStudents = function () {
    return checkInitialization().then(() => {
        if (dataCollection.students.length === 0) {
            throw new Error("No students found");
        }
        return dataCollection.students;
    });
}

module.exports.getTAs = function () {
    return checkInitialization().then(() => {
        const filteredStudents = dataCollection.students.filter(student => student.TA === true);
        if (filteredStudents.length === 0) {
            throw new Error("No TAs found");
        }
        return filteredStudents;
    });
};

module.exports.getCourses = function () {
    return checkInitialization().then(() => {
        if (dataCollection.courses.length === 0) {
            throw new Error("No courses found");
        }
        return dataCollection.courses;
    });
};

module.exports.getStudentByNum = function (num) {
    return checkInitialization().then(() => {
        const foundStudent = dataCollection.students.find(student => student.studentNum === num);
        if (!foundStudent) {
            throw new Error("Student not found");
        }
        return foundStudent;
    });
};

module.exports.getStudentsByCourse = function (course) {
    return checkInitialization().then(() => {
        const filteredStudents = dataCollection.students.filter(student => student.course === course);
        if (filteredStudents.length === 0) {
            throw new Error("No students found for the course");
        }
        return filteredStudents;
    });
};

