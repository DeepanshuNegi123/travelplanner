import React, { useState, useRef } from "react"
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Upload,
  X,
  Plus,
  Image as ImageIcon,
  Trash2
} from "lucide-react"

const MyTrips = () => {
  const [trips] = useState([
    {
      id: "1",
      destination: "Paris, France",
      country: "France",
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      travelers: 2,
      status: "upcoming",
      image:
        "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
      photos: [
        "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=400"
      ]
    },
    {
      id: "2",
      destination: "Tokyo, Japan",
      country: "Japan",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      travelers: 1,
      status: "completed",
      image:
        "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 5,
      notes:
        "Amazing trip! The cherry blossoms were beautiful and the food was incredible.",
      photos: [
        "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400"
      ]
    },
    {
      id: "3",
      destination: "Santorini, Greece",
      country: "Greece",
      startDate: "2023-08-05",
      endDate: "2023-08-12",
      travelers: 2,
      status: "completed",
      image:
        "https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4,
      notes:
        "Beautiful sunsets and amazing Greek cuisine. Would definitely visit again!",
      photos: [
        "https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400"
      ]
    }
  ])

  const [selectedTrip, setSelectedTrip] = useState(null)
  const [showGallery, setShowGallery] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState({})
  const fileInputRef = useRef(null)

  const getStatusColor = status => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDaysUntil = date => {
    const tripDate = new Date(date)
    const today = new Date()
    const diffTime = tripDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleFileUpload = (tripId, files) => {
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        const result = e.target?.result
        setUploadedPhotos(prev => ({
          ...prev,
          [tripId]: [...(prev[tripId] || []), result]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (tripId, photoIndex) => {
    setUploadedPhotos(prev => ({
      ...prev,
      [tripId]: prev[tripId]?.filter((_, index) => index !== photoIndex) || []
    }))
  }

  const getAllPhotos = trip => {
    return [...trip.photos, ...(uploadedPhotos[trip.id] || [])]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Trips</h1>
          <p className="text-lg text-gray-600">
            Your travel memories and upcoming adventures
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Trips</p>
                <p className="text-3xl font-bold text-blue-600">
                  {trips.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Countries Visited</p>
                <p className="text-3xl font-bold text-green-600">
                  {new Set(trips.map(t => t.country)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Photos Uploaded</p>
                <p className="text-3xl font-bold text-purple-600">
                  {trips.reduce(
                    (total, trip) => total + getAllPhotos(trip).length,
                    0
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Upcoming Trips</p>
                <p className="text-3xl font-bold text-orange-600">
                  {trips.filter(t => t.status === "upcoming").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map(trip => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-48 object-cover"
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    trip.status
                  )}`}
                >
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </div>
                {trip.status === "upcoming" && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {getDaysUntil(trip.startDate)} days to go
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {trip.destination}
                </h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {new Date(trip.startDate).toLocaleDateString()} -{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {trip.travelers} traveler{trip.travelers > 1 ? "s" : ""}
                  </span>
                </div>

                {trip.rating && (
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < trip.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({trip.rating}/5)
                    </span>
                  </div>
                )}

                {trip.notes && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {trip.notes}
                  </p>
                )}

                {/* Photo Gallery Preview */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Photos ({getAllPhotos(trip).length})
                    </span>
                    <button
                      onClick={() => {
                        setSelectedTrip(trip)
                        setShowGallery(true)
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="flex space-x-2 overflow-x-auto">
                    {getAllPhotos(trip)
                      .slice(0, 4)
                      .map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Trip photo ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      ))}
                    {getAllPhotos(trip).length > 4 && (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-600">
                          +{getAllPhotos(trip).length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Photos Button */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Add Photos</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTrip(trip)
                      setShowGallery(true)
                    }}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={e => handleFileUpload(trip.id, e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Modal */}
        {showGallery && selectedTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedTrip.destination} - Photo Gallery
                  </h2>
                  <button
                    onClick={() => setShowGallery(false)}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getAllPhotos(selectedTrip).map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Trip photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {uploadedPhotos[selectedTrip.id]?.includes(photo) && (
                        <button
                          onClick={() =>
                            removePhoto(
                              selectedTrip.id,
                              uploadedPhotos[selectedTrip.id].indexOf(photo)
                            )
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add More Photos Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Add Photos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyTrips
