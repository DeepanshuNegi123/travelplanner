import React from "react"
import { Link } from "react-router-dom"
import { MapPin } from "lucide-react"

const Footer = () => {
  const footerSections = [
    {
      title: "GoWithMood",
    
    },

    {
      title: "Features",
      links: [
        { name: "Trip Planning", href: "/plan" },
        { name: "Smart Booking", href: "/my-bookings" },
        // { name: "VR Exploration", href: "/features" }
      ]
    },

    {
      title: "Booking",
      links: [
        { name: "Hotels", href: "/my-bookings" },
        { name: "Flights", href: "/my-bookings" },
        { name: "Trains", href: "/my-bookings" },
        { name: "Buses", href: "/my-bookings" }
      ]
    },
    {
      title: "Support",
      links: 
      [

        { name: "Travel Insurance", href: "/subscription" },
        { name: "Contact Us", href: "/contact" },
        // { name: "Help Center", href: "/features" }
      ]
    }
  ]

  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              {index === 0 ? (
                <div>
                  <Link
                    to="/"
                    className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">GoWithMood</span>
                  </Link>
                  <p className="text-gray-400 mb-4">
                    Your AI trip designer for mood-based planning.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 GoWithMood. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
