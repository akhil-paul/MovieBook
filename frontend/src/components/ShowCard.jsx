import { Link } from 'react-router-dom';

const ShowCard = ({ show }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAvailable = show.available_seats > 0;

  return (
    <div className={`bg-white rounded-lg shadow-md p-5 border-2 ${
      isAvailable ? 'border-green-200 hover:border-green-400' : 'border-red-200'
    } transition-all`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-800">
              🎭 {show.venue?.name || 'Venue'}
            </span>
          </div>
          <p className="text-sm text-gray-600">📍 {show.venue?.location}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {show.available_seats} seats left
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">🕐 Start:</span> {formatDateTime(show.start_time)}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">🕐 End:</span> {formatDateTime(show.end_time)}
        </p>
      </div>

      {isAvailable ? (
        <Link
          to={`/book/${show.id}`}
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg font-semibold transition-colors"
        >
          Book Now
        </Link>
      ) : (
        <button
          disabled
          className="block w-full bg-gray-300 text-gray-500 text-center py-2 rounded-lg font-semibold cursor-not-allowed"
        >
          Sold Out
        </button>
      )}
    </div>
  );
};

export default ShowCard;

