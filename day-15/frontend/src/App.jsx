import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import MainLayout from './components/MainLayout';
import api from './services/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const user = await api.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear token if it's invalid
        api.logout();
      } finally {
        setIsLoading(false);
      }
    };

    if(!currentUser){

      checkAuthStatus();
    }
  }, [currentUser]);

  const handleLogin = async (credentials) => {
    try {
      const data = await api.login(credentials);
      setCurrentUser(data.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const data = await api.register(userData);
      console.log(data)
      if (data.token) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <MainLayout user={currentUser}>
        <Routes>
          <Route 
            path="/login" 
            element={
              currentUser ? 
                <Navigate to="/dashboard" /> : 
                <LoginForm onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              currentUser ? 
                <Navigate to="/dashboard" /> : 
                <RegisterForm onRegister={handleRegister} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              currentUser ? 
                <Dashboard user={currentUser} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App
