// day-09-useeffect-fetch/src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate a consistent avatar URL based on student ID
  const getAvatarUrl = (id, name) => {
    // Use different styles for variety
    const styles = ['initials', 'shapes', 'bottts', 'pixel-art'];
    const style = styles[id % styles.length];
    // Use the name for seed to keep consistent images for same student
    return `https://picsum.photos/id/1`;
  };

  // useEffect → fetch data when component loads
  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load student data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading student data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Student Directory</h1>
      
      <div className="student-grid">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <div className="student-avatar">
              <img src="https://random-image-pepebigotes.vercel.app/api/random-image" alt={`${student.name}'s avatar`} />
            </div>
            <div className="student-header">
              <h2>{student.name}</h2>
            </div>
            <div className="student-info">
              <p><span>Course:</span> {student.course}</p>
              <p><span>Roll No:</span> {student.id}</p>
              <p><span>Grade:</span> <span className={`grade grade-${student.grade.toLowerCase()}`}>{student.grade}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
