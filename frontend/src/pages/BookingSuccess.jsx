import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookings } from '../api/api';

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await getBookings();
      const foundBooking = response.data.find(b => b.id === parseInt(bookingId));
      setBooking(foundBooking);
    } catch (err) {
      console.error('Failed to fetch booking details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
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
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h1>
        <p className="text-gray-600 mb-8">Your seats have been successfully booked</p>

        {/* Booking Details */}
        {booking && (
          <div className="bg-purple-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Booking Details</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Booking ID:</span>
                <span>#{booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{booking.user_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Seats Booked:</span>
                <span className="text-purple-600 font-bold">{booking.seats_booked}</span>
              </div>
              {booking.show && (
                <>
                  <div className="flex justify-between">
                    <span className="font-semibold">Movie:</span>
                    <span>{booking.show.movie?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Venue:</span>
                    <span>{booking.show.venue?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Show Time:</span>
                    <span>{formatDateTime(booking.show.start_time)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">Booked On:</span>
                <span>{formatDateTime(booking.timestamp)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Browse More Movies
          </Link>
          <button
            onClick={() => window.print()}
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

