import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MainLayout = ({ children, user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full mx-auto bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Auth Demo App</h1>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Logged in as <span className="font-medium">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Auth Demo App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
