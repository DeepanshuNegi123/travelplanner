import React, { useState } from "react";
import BookingModal from "./BookingModal";
import {
  MapPin,
  Users,
  DollarSign,
  Star,
  Play,
  Heart,
  Bookmark
} from "lucide-react";
import { hotelAPI, vrAPI, countryAPI } from "../services/api";

const AITripPlanner = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(2); // Start directly at step 2
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const [vrContent, setVRContent] = useState(null);
  const [countryFlag, setCountryFlag] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Handle destination selection from AI results
  const handleAIDestinations = (aiDestinations) => {
    setDestinations(aiDestinations);
    setCurrentStep(2);
  };

  // Handle destination selection
  const selectDestination = async (destination) => {
    setSelectedDestination(destination);
    setLoading(true);

    try {
      // Get country flag
      const countryData = await countryAPI.getCountryByCode(destination.country);
      if (countryData?.[0]) {
        setCountryFlag(countryData[0].flags.svg);
      }

      // Search hotels in the selected destination
      const hotelResults = await hotelAPI.searchHotels(
        destination.name,
        "", // No check-in date
        "", // No check-out date
        2 // Default to 2 travelers
      );
      setHotels(hotelResults);
      setCurrentStep(3);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle hotel selection
  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  };

  // Show VR preview for destination
  const showVRPreview = async () => {
    if (!selectedDestination) return;

    setLoading(true);
    try {
      const content = await vrAPI.getVRContent(selectedDestination.id);
      setVRContent(content);
      setShowVR(true);
    } catch (error) {
      console.error("Error fetching VR content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Book the trip
  const bookTrip = async () => {
    if (!selectedHotel || !selectedDestination) return;

    setLoading(true);
    try {
      const bookingDetails = {
        destination: selectedDestination,
        hotel: selectedHotel,
        travelers: 2,
        totalCost: selectedHotel.price * 7 + selectedDestination.estimatedCost // Assuming 7 days
      };

      const booking = await hotelAPI.bookHotel(selectedHotel.id, bookingDetails);
      alert(`Booking confirmed! Booking ID: ${booking.bookingId}`);
      setCurrentStep(4);
    } catch (error) {
      console.error("Error booking trip:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Progress bar (simplified to only show steps 2 and 3)
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-8 mb-4">
        {[2, 3].map(step => (
          <div
            key={step}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step <= currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // Step 2: Destination Selection (from AI)
  const Step2 = () => (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Destination
      </h2>
      {destinations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No destinations found. Please try again.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {destinations.map(destination => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => selectDestination(destination)}
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  ${destination.estimatedCost}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {destination.countryName}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.activities
                    .slice(0, 3)
                    .map((activity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Best time: {destination.bestTime}
                  </span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Step 3: Hotel Selection
  const Step3 = () => (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="flex items-center mb-8">
        {countryFlag && (
          <img
            src={countryFlag}
            alt="Country flag"
            className="w-8 h-8 mr-3 rounded object-contain"
          />
        )}
        <h2 className="text-3xl font-bold">
          Hotels in {selectedDestination.name}
        </h2>
      </div>

      {/* VR Preview Button */}
      <div className="mb-8 text-center">
        <button
          onClick={showVRPreview}
          disabled={loading}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-70"
        >
          <Play className="w-5 h-5" />
          <span>VR Preview of {selectedDestination.name}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <div
            key={hotel.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            onClick={() => selectHotel(hotel)}
          >
            <div className="relative">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <Bookmark className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                ${hotel.price}/night
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{hotel.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">{hotel.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {hotel.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Select Hotel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // VR Modal Component
  const VRModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">
            VR Preview: {selectedDestination?.name}
          </h3>
          <button
            onClick={() => setShowVR(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <p className="text-gray-600 mb-6">{vrContent.description}</p>

        {vrContent.videos?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">360° Videos</h4>
            <div className="grid gap-4">
              {vrContent.videos.map((video, index) => (
                <div key={index} className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
                  <video
                    controls
                    className="absolute top-0 left-0 w-full h-full"
                    poster={vrContent.images360?.[0]}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}

        {vrContent.images360?.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-3">360° Images</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vrContent.images360.map((image, index) => (
                <div key={index} className="relative pb-[75%] h-0">
                  <img
                    src={image}
                    alt={`360° view ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <ProgressBar />
        
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && selectedDestination && !showBookingModal && <Step3 />}
        
        {showVR && vrContent && <VRModal />}
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          destination={selectedDestination}
          hotel={selectedHotel}
          onBook={bookTrip}
        />
      </div>
    </div>
  );
};

export default AITripPlanner;