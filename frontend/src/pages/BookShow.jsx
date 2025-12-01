import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllShows, bookShow } from '../api/api';

const BookShow = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [userName, setUserName] = useState('');
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShowDetails();
  }, [showId]);

  const fetchShowDetails = async () => {
    try {
      setLoading(true);
      const response = await getAllShows();
      const foundShow = response.data.find(s => s.id === parseInt(showId));
      if (!foundShow) {
        setError('Show not found');
      } else {
        setShow(foundShow);
      }
    } catch (err) {
      setError('Failed to load show details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (seatsBooked < 1 || seatsBooked > show.available_seats) {
      setError(`Please select between 1 and ${show.available_seats} seats`);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await bookShow(showId, {
        user_name: userName,
        seats_booked: seatsBooked
      });
      navigate(`/booking-success/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to complete booking. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading show details...</p>
        </div>
      </div>
    );
  }

  if (error && !show) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Book Your Seats</h1>

        {/* Show Details */}
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Show Details</h2>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Movie:</span> {show?.movie?.title}</p>
            <p><span className="font-semibold">Venue:</span> {show?.venue?.name}</p>
            <p><span className="font-semibold">Location:</span> {show?.venue?.location}</p>
            <p><span className="font-semibold">Show Time:</span> {formatDateTime(show?.start_time)}</p>
            <p><span className="font-semibold">Available Seats:</span> <span className="text-green-600 font-bold">{show?.available_seats}</span></p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="seatsBooked" className="block text-gray-700 font-semibold mb-2">
              Number of Seats *
            </label>
            <input
              type="number"
              id="seatsBooked"
              value={seatsBooked}
              onChange={(e) => setSeatsBooked(parseInt(e.target.value))}
              min="1"
              max={show?.available_seats}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Maximum {show?.available_seats} seats available
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting || show?.available_seats === 0}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookShow;

