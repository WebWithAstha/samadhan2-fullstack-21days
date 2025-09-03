// In-memory "database"
let students = [
  { id: 1, name: "Astha", marks: 85 },
  { id: 2, name: "Devraj", marks: 92 },
  { id: 3, name: "Riya", marks: 78 },
];

// 👉 GET: All students
const getAllStudents = (req, res) => {
  res.json(students);
};

// 👉 GET: Single student by id
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
};

// 👉 POST: Add a student
const addStudent = (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.status(201).json({ message: "Student added", student: newStudent });
};

// 👉 PUT: Update a student
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  students[index] = { ...students[index], ...req.body };
  res.json({ message: "Student updated", student: students[index] });
};

// 👉 DELETE: Remove a student
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Student deleted" });
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
