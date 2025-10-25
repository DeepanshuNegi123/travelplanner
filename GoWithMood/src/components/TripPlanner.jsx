import React, { useState, useCallback } from "react";
import BookingModal from "./BookingModal";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Star,
  Play,
  Heart,
  Bookmark
} from "lucide-react";
import { aiservices, destinationAPI, hotelAPI, vrAPI, countryAPI } from "../services/api";

const TripPlanner = () => {
  // State declarations
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [travelers, setTravelers] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aidestinations, setAiDestinations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const [vrContent, setVRContent] = useState(null);
  const [countryFlag, setCountryFlag] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [travelerType, setTravelerType] = useState("");

  // Configuration data
  const moods = [
    { id: "adventure", name: "Adventure", emoji: "⛰️", color: "from-orange-400 to-red-500" },
    { id: "relaxation", name: "Relaxation", emoji: "🌴", color: "from-green-400 to-emerald-500" },
    { id: "romance", name: "Romance", emoji: "❤️", color: "from-pink-400 to-rose-500" },
    { id: "friends", name: "Friends", emoji: "👥", color: "from-purple-400 to-violet-500" }
  ];

  const travelerOptions = [
    { id: "solo", name: "Solo Travel", icon: "🧳" },
    { id: "couple", name: "Couple", icon: "💑" },
    { id: "family", name: "Family", icon: "👨‍👩‍👧‍👦" },
    { id: "friends", name: "Friends", icon: "👥" }
  ];

  // Core functions
  const searchDestinations = async () => {
    if (!selectedMood || !budget) return;

    setLoading(true);
    try {
      const results = await destinationAPI.getDestinations(selectedMood, parseInt(budget));
      setDestinations(results);
      setCurrentStep(2);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectDestination = async (destination) => {
    setSelectedDestination(destination);
    setLoading(true);

    try {
      const countryData = await countryAPI.getCountryByCode(destination.country);
      if (countryData?.[0]) {
        setCountryFlag(countryData[0].flags.svg);
      }

      const hotelResults = await hotelAPI.searchHotels(
        destination.name,
        checkIn,
        checkOut,
        parseInt(travelers) || 2
      );
      setHotels(hotelResults);
      setCurrentStep(3);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  };

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

  const bookTrip = async () => {
    if (!selectedHotel || !selectedDestination || !checkIn || !checkOut || !travelers || !travelerType || !duration) {
      alert("Please fill all trip details before booking.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to book a trip. You can register or login using the login button in the header.");
      return;
    }

    console.log("🔍 User ID from localStorage:", userId);

    const totalCost = selectedHotel.price * parseInt(duration) + selectedDestination.estimatedCost;

    const trip = {
      destination: selectedDestination,
      hotel: selectedHotel,
      checkIn,
      checkOut,
      travelers: parseInt(travelers),
      travelerType,
      totalCost
    };

    console.log("📝 Frontend: Sending trip booking request:", { userId, trip });

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4002/api/trip/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, trip })
      });

      console.log("📝 Frontend: Response status:", response.status);

      const data = await response.json();

      if (response.ok) {
        alert("Trip booked successfully!");
        setCurrentStep(4);
      } else {
        console.error("Booking failed:", data.message);
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
      setShowBookingModal(false);
    }
  };

  // Component sub-parts
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map(step => (
          <div
            key={step}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step <= currentStep ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const Step1 = useCallback(() => (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8">Plan Your Perfect Trip</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">What's your travel mood?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map(mood => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`relative p-6 rounded-2xl transition-all duration-300 overflow-hidden ${
                selectedMood === mood.id ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-10 rounded-2xl`}></div>
              <div className="relative text-center">
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div className="font-semibold">{mood.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        

          <div>
  <label className="block text-sm font-medium mb-2">Budget (USD)</label>
  <div className="relative">
    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
    <input
      key="budget-input"
      type="number"
      value={budget}
      onChange={(e) => setBudget(e.target.value)}
      placeholder="e.g., 2000"
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      autoComplete="off"
    />
  </div>
</div>



        <div>
          <label className="block text-sm font-medium mb-2">Duration (days)</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select duration</option>
              <option value="3">3 Days</option>
              <option value="5">5 Days</option>
              <option value="7">1 Week</option>
              <option value="10">10 Days</option>
              <option value="14">2 Weeks</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Check-in Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Check-out Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Travelers</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              placeholder="Number of travelers"
              min="1"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Who are you traveling with?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {travelerOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setTravelerType(option.id)}
              className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                travelerType === option.id
                  ? "border-blue-500 bg-blue-50 scale-105"
                  : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium">{option.name}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={searchDestinations}
        disabled={!selectedMood || !budget || !duration || loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Searching...
          </span>
        ) : (
          "Find My Perfect Destination"
        )}
      </button>
    </div>
  ), [selectedMood, budget, duration, travelers, checkIn, checkOut, travelerType, loading]);

  const Step2 = useCallback(() => (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Destination</h2>
      {destinations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No destinations found. Please try different search criteria.</p>
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
                    <span className="text-sm text-gray-600">{destination.countryName}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.activities.slice(0, 3).map((activity, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Best time: {destination.bestTime}</span>
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
  ), [destinations, selectedDestination, loading]);

  const Step3 = useCallback(() => (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="flex items-center mb-8">
        {countryFlag && (
          <img src={countryFlag} alt="Country flag" className="w-8 h-8 mr-3 rounded object-contain" />
        )}
        <h2 className="text-3xl font-bold">Hotels in {selectedDestination.name}</h2>
      </div>

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
              <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
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
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hotel.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
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
  ), [selectedDestination, hotels, selectedHotel, countryFlag, loading]);

  const VRModal = useCallback(() => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">VR Preview: {selectedDestination?.name}</h3>
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
  ), [vrContent, selectedDestination]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <ProgressBar />
        
        {currentStep === 1 && <Step1 />}
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

export default TripPlanner;