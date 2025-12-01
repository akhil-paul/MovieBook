import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative h-80 overflow-hidden bg-gray-200">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{movie.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{movie.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-purple-600 font-semibold">⏱️ {movie.duration} mins</span>
            <span className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

