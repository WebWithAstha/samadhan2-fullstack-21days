import './App.css'
import StudentDirectory from './components/StudentDirectory'

function App() {
  return (
    <div className="app-container">
      <h1>Day 9: useEffect & Fetch API</h1>
      <p className="server-note">
        Note: Make sure your Express server from Day 5 is running on port 3000
      </p>
      <StudentDirectory />
    </div>
  )
}

export default App
