// day-08-lists-events/src/App.jsx
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add new task
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  // Toggle task done
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Remove task
  const removeTask = (id, e) => {
    e.stopPropagation(); // Prevent triggering toggleTask
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>To-Do List</h1>

      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)} // handling onChange
        onKeyDown={(e) => e.key === "Enter" && addTask()} // handling Enter key
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)} // handling onClick
            style={{
              cursor: "pointer",
              textDecoration: task.done ? "line-through" : "none",
            }}
          >
            {task.text}
            <button 
              className="delete-btn" 
              onClick={(e) => removeTask(task.id, e)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
