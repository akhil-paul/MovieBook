import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import BookShow from './pages/BookShow'
import BookingSuccess from './pages/BookingSuccess'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AddMovie from './pages/AddMovie'
import AddShow from './pages/AddShow'
import ViewBookings from './pages/ViewBookings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/book/:showId" element={<BookShow />} />
          <Route path="/booking-success/:bookingId" element={<BookingSuccess />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-movie" element={<AddMovie />} />
          <Route path="/admin/add-show" element={<AddShow />} />
          <Route path="/admin/bookings" element={<ViewBookings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

