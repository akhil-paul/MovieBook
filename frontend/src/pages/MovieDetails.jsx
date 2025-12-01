import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShowCard from '../components/ShowCard';
import { getMovie, getShowsForMovie } from '../api/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const [movieRes, showsRes] = await Promise.all([
        getMovie(id),
        getShowsForMovie(id)
      ]);
      setMovie(movieRes.data);
      setShows(showsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load movie details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Movie not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Movie Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
              }}
            />
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                ⏱️ {movie.duration} minutes
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Showtimes</h2>
        {shows.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg">
            <p className="font-semibold">No shows available for this movie yet.</p>
            <p className="text-sm mt-1">Check back later for upcoming showtimes!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;

