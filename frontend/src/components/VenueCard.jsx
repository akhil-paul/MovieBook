const VenueCard = ({ venue }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">🎭 {venue.name}</h3>
          <p className="text-gray-600 text-sm mt-1">📍 {venue.location}</p>
        </div>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
          {venue.capacity} seats
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          <span className="font-semibold">Facilities:</span> {venue.facilities}
        </p>
      </div>
    </div>
  );
};

export default VenueCard;

