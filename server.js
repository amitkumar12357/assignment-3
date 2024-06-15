/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name:Amit kumar, Student ID: 160904231, Date: 14 june 2024
*
*******************************************************************************/

const express = require("express"); // Import Express.js
const path = require("path"); // Import the path module to work with file paths
const collegeData = require("./collegeData.js"); // Import the collegeData module

const app = express(); // Create an Express application
const PORT = process.env.PORT || 8080; // Set the port to listen on

// Defining the routes

// Route for the home page
app.get("/", (req, res) => { // GET route on the /home path
    res.sendFile(path.join(__dirname, "/views/home.html")); // Send the home.html file as the response
});

// Route for the about page
app.get("/about", (req, res) => { // GET route on the /about path
    res.sendFile(path.join(__dirname, "/views/about.html")); // Send the about.html file as the response
});

// Route for the HTML demo page
app.get("/htmlDemo", (req, res) => { // GET route on the /htmlDemo path
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html")); // Send the htmlDemo.html file as the response
});

// Route to get all students
app.get("/students", (req, res) => { 
    if (req.query.course) {
        // If a course query parameter is provided
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => {
                res.json(data); // Send the JSON response with the student data
            })
            .catch(err => {
                res.json({ message: "No results" }); // Send an error message if no data is found
            });
    } else {
        // If no course query parameter is provided
        collegeData.getAllStudents()
            .then(data => {
                res.json(data); // Send the JSON response with all students data
            })
            .catch(err => {
                res.json({ message: "No results" }); // Send an error message if no data is found
            });
    }
});

// Route to get all TAs
app.get("/tas", (req, res) => { 
    collegeData.getTAs()  // Call the getTAs function from collegeData module
        .then(data => {
            res.json(data); // Send the JSON response with all TAs data
        })
        .catch(err => {
            res.json({ message: "No results" }); // Send an error message if no data is found
        });
});

// Route to get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()  //Call the getCourses function from collegeData module
        .then(data => {
            res.json(data); // Send the JSON response with all courses data
        })
        .catch(err => {
            res.json({ message: "No results" }); // Send an error message if no data is found
        });
});

// Route to get a student by their student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num) // Call the getStudentByNum function from collegeData module with the student number as parameter
        .then(data => {
            res.json(data); // Send the JSON response with the student data
        })
        .catch(err => {
            res.json({ message: "No results" }); // Send an error message if no data is found
        });
});

// Handle 404 errors
app.use((req, res) => { //handles any requests that don't match the defined routes.
    res.status(404).send("Page Not Found"); // Send a 404 error message if the route is not found
});

// Start the server
app.listen(PORT, () => {// this code starts the server and listens on the specified port
    console.log(`Server listening on port ${PORT}`); // Log a message on the console which indicating that the server is running
});

