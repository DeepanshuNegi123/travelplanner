import React from "react"
// import { useTrip } from "../context/TripContext"
import { Mountain, Waves, Heart, Users } from "lucide-react"

const TripPlanning = () => {
  const {
    selectedMood,
    setSelectedMood,
    budget,
    setBudget,
    duration,
    setDuration,
    planTrip
  } = useTrip()

  const moods = [
    {
      id: "adventure",
      name: "Adventure",
      icon: Mountain,
      emoji: "⛰️",
      description: "Thrilling experiences and outdoor activities",
      color: "from-orange-400 to-red-500"
    },
    {
      id: "relaxation",
      name: "Relaxation",
      icon: Waves,
      emoji: "🌴",
      description: "Peaceful retreats and spa experiences",
      color: "from-green-400 to-emerald-500"
    },
    {
      id: "romance",
      name: "Romance",
      icon: Heart,
      emoji: "❤️",
      description: "Intimate getaways for couples",
      color: "from-pink-400 to-rose-500"
    },
    {
      id: "friends",
      name: "Friends",
      icon: Users,
      emoji: "👥",
      description: "Fun group activities and nightlife",
      color: "from-purple-400 to-violet-500"
    }
  ]

  return (
    <section id="plan" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Plan Your Perfect Trip in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simply select your mood, enter your budget, choose your trip
            duration, and hit "Plan My Trip" to unlock a customized travel
            experience.
          </p>
        </div>

        {/* Mood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {moods.map(mood => {
            const IconComponent = mood.icon
            return (
              <div
                key={mood.id}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedMood === mood.id
                    ? "ring-4 ring-blue-500 shadow-xl"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedMood(mood.id)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-10 rounded-2xl`}
                ></div>
                <div className="relative text-center">
                  <div className="text-4xl mb-3">{mood.emoji}</div>
                  <h3 className="text-xl font-semibold mb-2">{mood.name}</h3>
                  <p className="text-sm text-gray-600">{mood.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Planning Steps */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Start Your Journey
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Tell us what kind of experience you're looking for
          </p>

          <div className="space-y-8">
            {/* Step 1: Select Mood */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                1. Select Your Mood
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {moods.map(mood => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      selectedMood === mood.id
                        ? "bg-blue-500 text-white shadow-lg scale-105"
                        : "bg-white hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    <div className="text-2xl mb-2">{mood.emoji}</div>
                    <div className="font-medium">{mood.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Budget */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                2. Enter Your Budget (USD)
              </h3>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                placeholder="e.g., 2000"
                className="px-6 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors max-w-xs mx-auto"
              />
            </div>

            {/* Step 3: Duration */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                3. Choose Trip Duration
              </h3>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="px-6 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors max-w-xs mx-auto"
              >
                <option value="">Select duration</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">1 Week</option>
                <option value="10">10 Days</option>
              </select>
            </div>

            {/* Plan Button */}
            <div className="text-center">
              <button
                onClick={planTrip}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Plan My Trip
              </button>
              <p className="mt-4 text-gray-500">
                Get your personalized travel plan in seconds!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TripPlanning
