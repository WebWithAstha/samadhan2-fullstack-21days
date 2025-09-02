import React, { useState, useEffect } from 'react';
import './StudentDirectory.css';

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    course: '',
    grade: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch students from the backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/students');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setStudents(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to fetch students. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission to add a new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newStudent.name || !newStudent.course || !newStudent.grade) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const addedStudent = await response.json();
      setStudents([...students, addedStudent]);
      
      // Reset the form
      setNewStudent({
        name: '',
        course: '',
        grade: ''
      });
      setError(null);
    } catch (error) {
      console.error('Error adding student:', error);
      setError('Failed to add student. Please try again.');
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-directory-container">
      <h2>Student Directory</h2>
      
      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      {/* Add new student form */}
      <div className="add-student-form">
        <h3>Add New Student</h3>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="course">Course:</label>
            <input
              type="text"
              id="course"
              name="course"
              value={newStudent.course}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="grade">Grade:</label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={newStudent.grade}
              onChange={handleInputChange}
            />
          </div>
          
          <button type="submit" className="add-btn">Add Student</button>
        </form>
      </div>
      
      {/* Students list */}
      <div className="students-list-container">
        <h3>Students List</h3>
        
        {loading ? (
          <p className="loading-message">Loading students...</p>
        ) : filteredStudents.length > 0 ? (
          <div className="students-grid">
            {filteredStudents.map(student => (
              <div key={student.id} className="student-card">
                <h4>{student.name}</h4>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-students-message">
            {searchTerm ? 'No students match your search.' : 'No students found.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentDirectory;
