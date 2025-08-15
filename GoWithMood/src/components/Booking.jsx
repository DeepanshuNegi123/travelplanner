import React from "react";
import { Link } from "react-router-dom";
import { Building, Plane, Train, Bus } from "lucide-react";

const Booking = () => {
  const bookingOptions = [
    {
      icon: Building,
      title: "Hotels",
      description: "Book top-rated stays with one click.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Plane,
      title: "Flights",
      description: "Get smart flight deals and filters.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Train,
      title: "Trains",
      description: "Plan scenic journeys with accurate info.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Bus,
      title: "Buses",
      description: "Budget travel options across cities.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="booking" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make hassle-free bookings for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {bookingOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {option.title}
                </h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/my-bookings">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Start Booking
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Booking;
