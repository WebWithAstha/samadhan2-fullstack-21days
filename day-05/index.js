// Express.js Basic Server

// Import express
const express = require("express");
const cors = require("cors")

// Create an express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

// Sample data - list of students
let students = [
  { id: 1, name: "Devraj", course: "Computer Science", grade: "A" },
  { id: 2, name: "Astha", course: "Information Technology", grade: "B" },
  { id: 3, name: "Rahul", course: "Electronics", grade: "B" },
];

// GET route to fetch all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// GET route to fetch a specific student by ID
app.get("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// POST route to create a new student
app.post("/api/students", (req, res) => {
  const { name, course, grade } = req.body;

  // Basic validation
  if (!name || !course || !grade) {
    return res
      .status(400)
      .json({ message: "Please provide name, course, and grade" });
  }

  // Create new student
  const newStudent = {
    id: students.length + 1,
    name,
    course,
    grade,
  };

  // Add to our students array
  students.push(newStudent);

  // Return the newly created student
  res.status(201).json(newStudent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
