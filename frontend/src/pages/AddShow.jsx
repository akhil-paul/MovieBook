import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createShow, getMovies, getVenues } from '../api/api';

const AddShow = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    movie_id: '',
    venue_id: '',
    start_time: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [moviesRes, venuesRes] = await Promise.all([
        getMovies(),
        getVenues()
      ]);
      setMovies(moviesRes.data);
      setVenues(venuesRes.data);
    } catch (err) {
      setError('Failed to load movies and venues');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createShow({
        movie_id: parseInt(formData.movie_id),
        venue_id: parseInt(formData.venue_id),
        start_time: new Date(formData.start_time).toISOString()
      });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create show. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedMovie = movies.find(m => m.id === parseInt(formData.movie_id));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Schedule New Show</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="movie_id" className="block text-gray-700 font-semibold mb-2">
              Select Movie *
            </label>
            <select
              id="movie_id"
              name="movie_id"
              required
              value={formData.movie_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="">-- Select a movie --</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title} ({movie.duration} mins)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="venue_id" className="block text-gray-700 font-semibold mb-2">
              Select Venue *
            </label>
            <select
              id="venue_id"
              name="venue_id"
              required
              value={formData.venue_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="">-- Select a venue --</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name} - {venue.location} ({venue.capacity} seats)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="start_time" className="block text-gray-700 font-semibold mb-2">
              Start Time *
            </label>
            <input
              type="datetime-local"
              id="start_time"
              name="start_time"
              required
              value={formData.start_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {selectedMovie && formData.start_time && (
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Auto-calculated End Time:</span>{' '}
                {new Date(
                  new Date(formData.start_time).getTime() + selectedMovie.duration * 60000
                ).toLocaleString()}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Schedule Show'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShow;

