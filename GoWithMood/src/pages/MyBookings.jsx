import React, { useState } from "react"
import {
  Calendar,
  MapPin,
  Star,
  Download,
  MessageCircle,
  Phone,
  Mail,
  Filter,
  Search
} from "lucide-react"

const MyBookings = () => {
  const [bookings] = useState([
    {
      id: "1",
      bookingId: "BK123456",
      hotelName: "Grand Palace Hotel",
      destination: "Paris, France",
      checkIn: "2024-03-15",
      checkOut: "2024-03-18",
      guests: 2,
      rooms: 1,
      totalAmount: 1247.5,
      status: "confirmed",
      hotelImage:
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
      hotelRating: 4.8,
      bookingDate: "2024-02-10",
      confirmationNumber: "CNF789012"
    },
    {
      id: "2",
      bookingId: "BK123457",
      hotelName: "Seaside Resort & Spa",
      destination: "Maldives",
      checkIn: "2024-04-20",
      checkOut: "2024-04-25",
      guests: 2,
      rooms: 1,
      totalAmount: 2850.0,
      status: "confirmed",
      hotelImage:
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
      hotelRating: 4.9,
      bookingDate: "2024-02-15",
      confirmationNumber: "CNF789013"
    },
    {
      id: "3",
      bookingId: "BK123458",
      hotelName: "Mountain View Lodge",
      destination: "Queenstown, New Zealand",
      checkIn: "2024-01-10",
      checkOut: "2024-01-15",
      guests: 4,
      rooms: 2,
      totalAmount: 1680.0,
      status: "completed",
      hotelImage:
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      hotelRating: 4.6,
      bookingDate: "2023-12-05",
      confirmationNumber: "CNF789014"
    }
  ])

  const [selectedBooking, setSelectedBooking] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus
    const matchesSearch =
      booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = status => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = status => {
    switch (status) {
      case "confirmed":
        return "✅"
      case "pending":
        return "⏳"
      case "cancelled":
        return "❌"
      case "completed":
        return "🎉"
      default:
        return "📋"
    }
  }

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-lg text-gray-600">
            Manage your travel reservations and view booking details
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-blue-600">
                  {bookings.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">
                  {bookings.filter(b => b.status === "confirmed").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-purple-600">
                  {bookings.filter(b => b.status === "completed").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Spent</p>
                <p className="text-3xl font-bold text-orange-600">
                  $
                  {bookings
                    .reduce((sum, b) => sum + b.totalAmount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Hotel Image */}
                  <div className="lg:w-64 flex-shrink-0">
                    <img
                      src={booking.hotelImage}
                      alt={booking.hotelName}
                      className="w-full h-48 lg:h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {booking.hotelName}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {getStatusIcon(booking.status)}{" "}
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{booking.destination}</span>
                        </div>

                        <div className="flex items-center text-gray-600 mb-2">
                          <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                          <span>{booking.hotelRating} rating</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          ${booking.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Booking ID: {booking.bookingId}
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Check-in</div>
                        <div className="font-semibold">
                          {formatDate(booking.checkIn)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Check-out</div>
                        <div className="font-semibold">
                          {formatDate(booking.checkOut)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-semibold">
                          {calculateNights(booking.checkIn, booking.checkOut)}{" "}
                          nights
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Guests</div>
                        <div className="font-semibold">
                          {booking.guests} guests, {booking.rooms} room
                          {booking.rooms > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <span>View Details</span>
                      </button>

                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>

                      <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Contact Hotel</span>
                      </button>

                      {booking.status === "confirmed" && (
                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Booking Details
                  </h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Hotel Info */}
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedBooking.hotelImage}
                    alt={selectedBooking.hotelName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedBooking.hotelName}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedBooking.destination}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{selectedBooking.hotelRating} rating</span>
                    </div>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Booking Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Booking ID:</span>
                        <span className="font-mono">
                          {selectedBooking.bookingId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confirmation:</span>
                        <span className="font-mono">
                          {selectedBooking.confirmationNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Booking Date:</span>
                        <span>{formatDate(selectedBooking.bookingDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${getStatusColor(
                            selectedBooking.status
                          )}`}
                        >
                          {selectedBooking.status.charAt(0).toUpperCase() +
                            selectedBooking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Stay Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>{formatDate(selectedBooking.checkIn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>{formatDate(selectedBooking.checkOut)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>
                          {calculateNights(
                            selectedBooking.checkIn,
                            selectedBooking.checkOut
                          )}{" "}
                          nights
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span>{selectedBooking.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rooms:</span>
                        <span>{selectedBooking.rooms}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Need Help?
                  </h4>
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>Call Support</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                      <Mail className="w-4 h-4" />
                      <span>Email Support</span>
                    </button>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total Amount Paid
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${selectedBooking.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't made any bookings yet. Start planning your next adventure!"}
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Plan Your First Trip
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings
