/*
    CIT 281 Project 3
    Name: Edwin Gutierrez
*/

const fastify = require('fastify') ();

// Array of random students
const students = [
    {
      id: 1,
      last: "Flores",
      first: "Luis",
    },
    {
      id: 2,
      last: "Amesbury",
      first: "Kyler",
    },
    {
      id: 3,
      last: "Liu",
      first: "Josh",
    }
];

const listenIP = 'localhost';
const listenPort = 8080;

// At my generic url, returns the json object of all students
fastify.get("/cit/student", (req, res) => {
    res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send(students);
});

// Another GET route, finds student by the id query parameter, or returns 404 if DNE
fastify.get("/cit/student/:id", (req, res) => {
    const { id: studentID } = req.params;

    let individualStudent = null;
    for (const studentObj of students) {
        if (parseInt(studentID) === studentObj.id) {
            individualStudent = studentObj;
            break;
        }
    }
    if (individualStudent !== null) {
        res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send(individualStudent);
    } else {
        res
        .code(404)
        .header("Content-Type", "text/html; charsetutf-8")
        .send("<h1>Unsupported request or page!</h1>");
    }
});

// Another GET route for wildacrd url, will return 404 for unmatched
fastify.get("*", (req, res) => {
    res
        .code(404)
        .header("Content-Type", "text/html; charsetutf-8")
        .send("<h1>Unmatched route!</h1>");
});


fastify.post("/cit/student/add", (req, res) => {

    // Retrieves new student object from postman without id
    let newStudentObj = JSON.parse(req.body);
    console.log(newStudentObj);

    let listOfStudentIDs = [];
    for (studentObj of students) {
        listOfStudentIDs.push(studentObj.id);
    }
    let maxID = Math.max(...listOfStudentIDs);

    newStudentObj = { id: maxID + 1, ...newStudentObj };

    students.push(newStudentObj);

    res
        .code(200)
        .header("Content-Type", "application/json; charsetutf-8")
        .send(newStudentObj);
});

fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on http://${listenIP}:${listenPort}`);
});