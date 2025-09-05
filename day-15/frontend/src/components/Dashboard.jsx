import { useState, useEffect } from 'react';

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  
  // Simulate loading some user stats
  useEffect(() => {
    const loadUserStats = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setStats({
          posts: Math.floor(Math.random() * 50),
          followers: Math.floor(Math.random() * 500),
          following: Math.floor(Math.random() * 200)
        });
        setLoading(false);
      }, 800);
    };
    
    loadUserStats();
  }, []);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Welcome, {user?.name || 'User'}!</h2>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-lg mb-6 border border-indigo-100">
        <h3 className="text-sm font-semibold text-indigo-700 mb-3">Your Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-xs mb-1">Name:</p>
            <p className="font-medium text-sm">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Email:</p>
            <p className="font-medium text-sm">{user?.email || 'N/A'}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-indigo-100">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-medium text-indigo-600">Account Statistics</h4>
            {loading && <div className="animate-pulse w-4 h-4 bg-indigo-200 rounded-full"></div>}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-white p-2 rounded-md text-center shadow-sm">
              <span className="block text-xl font-bold text-gray-800">{stats.posts}</span>
              <span className="text-xs text-gray-500">Posts</span>
            </div>
            <div className="bg-white p-2 rounded-md text-center shadow-sm">
              <span className="block text-xl font-bold text-gray-800">{stats.followers}</span>
              <span className="text-xs text-gray-500">Followers</span>
            </div>
            <div className="bg-white p-2 rounded-md text-center shadow-sm">
              <span className="block text-xl font-bold text-gray-800">{stats.following}</span>
              <span className="text-xs text-gray-500">Following</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-100 rounded-lg p-5 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <h4 className="font-medium text-sm text-gray-800 mb-1">Update Profile</h4>
            <p className="text-gray-500 text-xs">Edit your profile information.</p>
          </div>
          
          <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-medium text-sm text-gray-800 mb-1">Explore API</h4>
            <p className="text-gray-500 text-xs">Learn about our API endpoints.</p>
          </div>
          
          <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            </div>
            <h4 className="font-medium text-sm text-gray-800 mb-1">View Stats</h4>
            <p className="text-gray-500 text-xs">Check your account stats.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
