import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    setIsAdmin(!!admin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">🎬 MovieBook</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
              Movies
            </Link>
            
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/admin/add-movie" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                  Add Movie
                </Link>
                <Link to="/admin/add-show" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                  Add Show
                </Link>
                <Link to="/admin/bookings" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                  Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

