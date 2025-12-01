import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMovies, getVenues, getAllShows, getBookings } from '../api/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalVenues: 0,
    totalShows: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [moviesRes, venuesRes, showsRes, bookingsRes] = await Promise.all([
        getMovies(),
        getVenues(),
        getAllShows(),
        getBookings()
      ]);

      setStats({
        totalMovies: moviesRes.data.length,
        totalVenues: venuesRes.data.length,
        totalShows: showsRes.data.length,
        totalBookings: bookingsRes.data.length
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your movie booking system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Movies</p>
              <p className="text-3xl font-bold mt-2">{stats.totalMovies}</p>
            </div>
            <div className="text-5xl opacity-20">🎬</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Venues</p>
              <p className="text-3xl font-bold mt-2">{stats.totalVenues}</p>
            </div>
            <div className="text-5xl opacity-20">🎭</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Shows</p>
              <p className="text-3xl font-bold mt-2">{stats.totalShows}</p>
            </div>
            <div className="text-5xl opacity-20">🎟️</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold mt-2">{stats.totalBookings}</p>
            </div>
            <div className="text-5xl opacity-20">🎫</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/add-movie"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500"
          >
            <div className="text-4xl mb-4">➕🎬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add New Movie</h3>
            <p className="text-gray-600">Create a new movie entry in the system</p>
          </Link>

          <Link
            to="/admin/add-show"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500"
          >
            <div className="text-4xl mb-4">➕🎟️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule Show</h3>
            <p className="text-gray-600">Add a new show for a movie</p>
          </Link>

          <Link
            to="/admin/bookings"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500"
          >
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">View All Bookings</h3>
            <p className="text-gray-600">See all customer bookings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

